import { NotFoundException } from '@nestjs/common';
import { Example } from '../../domain/entities/example.entity';
import { ExampleRepository } from '../../domain/repositories/example.repository';

let Examples: Example[] = [];

export class InMemoryExampleRepository implements ExampleRepository {
  async create(
    data: Omit<Example, 'id' | 'createdAt' | 'updateAt'>,
  ): Promise<Example> {
    const model = new Example(data);

    Examples.push(model);

    return model;
  }

  async findAll(): Promise<Example[]> {
    const models = Examples;

    return models.map((model) => new Example(model));
  }

  async findById(id: string): Promise<Example> {
    const model = Examples.find((example) => id === example.id);

    if (!model) {
      throw new NotFoundException('exampleNotFound');
    }

    return new Example(model);
  }

  async update(
    id: string,
    data: Omit<Partial<Example>, 'id'>,
  ): Promise<Example> {
    const model = Examples.find((example) => example.id === id);

    const updated = new Example({ ...model, ...data });

    Examples = Examples.map((example) =>
      example.id === id ? updated : example,
    );

    return updated;
  }

  async delete(id: string): Promise<void> {
    Examples = Examples.filter((example) => example.id !== id);

    return;
  }

  async emailExists(email: string): Promise<boolean> {
    const model = Examples.find((example) => example.email === email);

    return !!model;
  }
}
