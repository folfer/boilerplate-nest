import { NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../../services/prisma/prisma.service';
import { Example } from '../../domain/entities/example.entity';
import { ExampleRepository } from '../../domain/repositories/example.repository';

export class PrismaExampleRepository implements ExampleRepository {
  prisma = new PrismaService();

  async create(
    data: Omit<Example, 'id' | 'createdAt' | 'updateAt'>,
  ): Promise<Example> {
    const model = await this.prisma.example.create({
      data,
    });

    return new Example(model);
  }

  async findAll(filter: Partial<Example>): Promise<Example[]> {
    const models = await this.prisma.example.findMany({ where: { ...filter } });

    return models.map((model) => new Example(model));
  }

  async findById(id: string): Promise<Example> {
    const model = await this.prisma.example.findUnique({
      where: {
        id,
      },
    });

    if (!model) {
      throw new NotFoundException('exampleNotFound');
    }

    return new Example(model);
  }

  async update(
    id: string,
    data: Omit<Partial<Example>, 'id'>,
  ): Promise<Example> {
    const model = await this.prisma.example.update({ where: { id }, data });

    return new Example(model);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.example.delete({ where: { id } });

    return;
  }

  async emailExists(email: string): Promise<boolean> {
    const model = await this.prisma.example.findFirst({ where: { email } });

    return !!model;
  }
}
