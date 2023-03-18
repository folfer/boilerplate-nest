import { ConflictException } from '@nestjs/common';
import { describe, test, expect } from 'vitest';
import { repositories } from '../../../../../shared/tests/dependencies';
import { CreateExampleDto } from './create-example.dto';
import { CreateExampleUseCase } from './create-example.use-case';

describe('CreateExample', () => {
  const createExampleUseCase = new CreateExampleUseCase(repositories);
  test('should createExample properly', async () => {
    const input: CreateExampleDto = {
      email: 'test@email.com',
      role: 'role',
      username: 'username',
    };

    const output = await createExampleUseCase.execute(input);

    expect(output.id).toBeDefined();
  });

  test('throw createExample if email exists', async () => {
    const input: CreateExampleDto = {
      email: 'test@email.com',
      role: 'role',
      username: 'username',
    };

    expect(createExampleUseCase.execute(input)).rejects.toEqual(
      new ConflictException('emailAlreadyExists'),
    );
  });
});
