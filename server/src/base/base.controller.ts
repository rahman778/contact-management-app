import { Body, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { BaseEntity, Repository } from 'typeorm';
import { BaseService } from './base.service';

export abstract class BaseController<
  T extends BaseEntity,
  CreateDtoType,
  UpdateDtoType extends Partial<CreateDtoType>,
> {
  constructor(private readonly service: BaseService<T>) {}

  @Post()
  async create(@Body() createDto: CreateDtoType): Promise<T> {
    const item = await this.service.store(createDto);
    return item;
  }

  @Get()
  async findAll(): Promise<T[]> {
    const items = await this.service.index();
    return items;
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<T> {
    const item = await this.service.findById(+id);
    return item;
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateDto: Partial<UpdateDtoType>,
  ): Promise<T> {
    const item = await this.service.update(+id, updateDto);
    return item;
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<number> {
    const result = await this.service.delete(+id);
    return result.affected;
  }
}
