import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { CreateVersionDto } from './dto/create-version.dto';
import { UpdateVersionDto } from './dto/update-version.dto';
import { VersionEntity } from './entities/version.entity';

@Injectable()
export class VersionService {

  constructor(
    @InjectRepository(VersionEntity)
    private ProductRepo: Repository<VersionEntity>,
    private dataSource: DataSource,
  ) {}

  create(createVersionDto: CreateVersionDto) {
    
  }

  findAll() {
    return `This action returns all version`;
  }

  findOne(id: number) {
    return `This action returns a #${id} version`;
  }

  update(id: number, updateVersionDto: UpdateVersionDto) {
    return `This action updates a #${id} version`;
  }

  remove(id: number) {
    return `This action removes a #${id} version`;
  }
}
