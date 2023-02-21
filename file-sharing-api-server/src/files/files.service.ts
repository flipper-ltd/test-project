import { Inject, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { JsonDB } from 'node-json-db';
import { AccessKeys } from './interfaces/keys.interface';
import { FileElement } from './schemas/file.schema';
@Injectable()
export class FilesService {
  constructor(@Inject('DATABASE_CONNECTION') private db: JsonDB) {}

  async create(createFileDto: { files: FileElement[] }) {
    const data = await this.findAll();
    const filesCreated = createFileDto.files.map((item) => {
      const id: string = item.filename.split('__')[0];
      const keys = this.getKeys(id);
      return {
        ...item,
        ...keys,
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

  async findByKey(key: string): Promise<FileElement> {
    let data: FileElement;
    try {
      const files: FileElement[] = await this.db.getData('/files');
      if (key) {
        data = files.find((item) => {
          const id: string = item.filename.split('__')[0];
          return bcrypt.compareSync(id, key);
        });
      }
    } catch (error) {
      data = null;
    }
    return data;
  }

  async remove(file: FileElement): Promise<FileElement> {
    const data = await this.findAll();
    const fileIndex = data.findIndex((item) => file.filename === item.filename);
    const [removedFile] = data.splice(fileIndex, 1);
    this.db.push('/files', data);
    return removedFile;
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
}
