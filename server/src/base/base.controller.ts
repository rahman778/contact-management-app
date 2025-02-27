import {
  applyDecorators,
  BadRequestException,
  Body,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { validate } from 'class-validator';
import { BaseEntity, Repository } from 'typeorm';
import { BaseService } from './base.service';

export abstract class BaseController<
  T extends BaseEntity,
  CreateDtoType,
  UpdateDtoType extends Partial<CreateDtoType>,
> {
  constructor(
    private readonly service: BaseService<T>,
    private readonly createDtoClass: new () => CreateDtoType,
    private readonly updateDtoClass: new () => UpdateDtoType,
  ) {}

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  async create(@Body() createDto: CreateDtoType): Promise<T> {
    const dtoInstance = Object.assign(new this.createDtoClass(), createDto);

    // Validate the DTO instance
    const errors = await validate(dtoInstance as any);
    if (errors.length > 0) {
      throw new BadRequestException(errors);
    }

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
  @UsePipes(new ValidationPipe({ transform: true }))
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: UpdateDtoType,
  ): Promise<T> {
    const dtoInstance = Object.assign(new this.updateDtoClass(), updateDto);
    const errors = await validate(dtoInstance);
    if (errors.length > 0) {
      throw new BadRequestException(errors);
    }

    return this.service.update(id, updateDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<number> {
    const result = await this.service.delete(+id);
    return result.affected;
  }
}
