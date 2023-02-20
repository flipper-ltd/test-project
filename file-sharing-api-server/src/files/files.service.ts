import { Inject, Injectable } from '@nestjs/common';
import { JsonDB } from 'node-json-db';
import { FileElement } from './schemas/file.schema';

@Injectable()
export class FilesService {
  constructor(@Inject('DATABASE_CONNECTION') private db: JsonDB) {}

  async create(createFileDto: { files: FileElement[] }) {
    const data = await this.findAll();
    data.unshift(...createFileDto.files);
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

  remove(id: number) {
    return `This action removes a #${id} file`;
  }
}
