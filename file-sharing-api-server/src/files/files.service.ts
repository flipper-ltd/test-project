import { Inject, Injectable } from '@nestjs/common';
import { JsonDB } from 'node-json-db';
import { FileElement } from './schemas/file.schema';

@Injectable()
export class FilesService {
  constructor(@Inject('DATABASE_CONNECTION') private db: JsonDB) {}

  async create(createFileDto: { files: FileElement[] }) {
    this.db.push('/files', createFileDto.files);
  }

  findAll(): Promise<FileElement[]> {
    return this.db.getData('/files');
  }

  remove(id: number) {
    return `This action removes a #${id} file`;
  }
}
