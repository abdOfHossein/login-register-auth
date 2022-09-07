import { QueryRunner } from 'typeorm';

export abstract class AbstractRepositoryClass {
  protected constructor() {}
  abstract findOneEntity(
    searchDto: any,
    options?: Record<string, any>,
  ): Promise<any>;
  abstract createEntity(createDto: any, query?: QueryRunner): Promise<any>;
  abstract deleteEntity(deleteEntity: any, query?: QueryRunner): Promise<any>;
  abstract updateEntity(
    entity: any,
    updateDto: any,
    query?: QueryRunner,
  ): Promise<any>;
}
