import {
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { Cron } from '@nestjs/schedule';
import { JsonDB } from 'node-json-db';
import { AccessKeys } from './interfaces/keys.interface';
import { FileElement } from './schemas/file.schema';
import { unlink } from 'fs';

@Injectable()
export class FilesService {
  private readonly logger = new Logger(FilesService.name);
  constructor(@Inject('DATABASE_CONNECTION') private db: JsonDB) {}

  async create(createFileDto: { files: FileElement[] }) {
    const data = await this.findAll();
    const filesCreated = createFileDto.files.map((item) => {
      const id: string = item.filename.split('__')[0];
      const keys = this.getKeys(id);
      return {
        ...item,
        ...keys,
        createdAt: new Date(),
        lastReadAt: new Date(),
      };
    });
    data.unshift(...filesCreated);
    this.db.push('/files', data);
  }

  async findAll(): Promise<FileElement[]> {
    let data: FileElement[];
    try {
      data = await this.db.getData('/files');
    } catch (error) {
      data = [];
    }
    return data;
  }

  /**
   * findByKey method will be optimize when using real database.
   * @param key string
   * @returns FileElement
   */

  async findByKey(key: string): Promise<FileElement> {
    let fileItem: FileElement;
    try {
      const files: FileElement[] = await this.db.getData('/files');
      fileItem = files.find((item) => {
        const id: string = item.filename.split('__')[0];
        return bcrypt.compareSync(id, key);
      });
      const data = files.filter((item: FileElement) => {
        if (item.filename === fileItem.filename) {
          return { ...item, lastReadAt: new Date() };
        }
        return item;
      });
      await this.db.push('/files', data);
    } catch (error) {
      fileItem = null;
    }
    return fileItem;
  }

  async remove(file: FileElement): Promise<FileElement> {
    try {
      const data = await this.findAll();
      const fileIndex = data.findIndex(
        (item) => file.filename === item.filename,
      );
      const [removedFile] = data.splice(fileIndex, 1);
      await this.deleteFileFromDisk(removedFile.path);
      await this.db.push('/files', data);
      return removedFile;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  getKeys(id: string): AccessKeys {
    const privateKey = this.hashData(id);
    const publicKey = this.hashData(id);

    return {
      privateKey,
      publicKey,
    };
  }

  hashData(data: string): string {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(data, salt);
  }

  @Cron('0 */2 * * * *') // each after two minutes
  async handleCron() {
    const data = await this.findAll();
    const refreshData: FileElement[] = [];
    for (let i = 0; i < data.length; i++) {
      if (
        new Date(data[i].lastReadAt).getTime() + 1000 * 60 * 2 <=
        new Date().getTime()
      ) {
        this.logger.log(`File "${data[i].originalname}" to be deleted`);
        await this.deleteFileFromDisk(data[i].path);
      } else {
        refreshData.push(data[i]);
      }
    }
    await this.db.push('/files', refreshData);
  }

  deleteFileFromDisk(path: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      unlink(path, (err) => {
        if (err) {
          return reject(err);
        } else {
          return resolve(true);
        }
      });
    });
  }
}
