import { BaseEntity, DeleteResult, Repository, FindOneOptions } from 'typeorm';
import { IBaseService } from './i.base.service';
import { EntityId } from 'typeorm/repository/EntityId';

export class BaseService<T extends BaseEntity> implements IBaseService<T> {
  constructor(private readonly repository: Repository<T>) {}

  index(): Promise<T[]> {
    return this.repository.find();
  }

  findById(id: EntityId): Promise<T> {
    const options: FindOneOptions<T> = { where: { id } as any };
    return this.repository.findOne(options);
  }

  store(data: any): Promise<T> {
    return this.repository.save(data);
  }

  async update(id: EntityId, data: any): Promise<T> {
    await this.repository.update(id, data);
    return this.findById(id);
  }

  delete(id: EntityId): Promise<DeleteResult> {
    return this.repository.delete(id);
  }
}
