import { ConflictException } from '@nestjs/common';
import { repositories } from '../../../../../shared/tests/dependencies';
import {
  CreateExampleDto,
  CreateExampleUseCase,
} from './create-example.use-case';

describe('CreateExample', () => {
  const createExampleUseCase = new CreateExampleUseCase(repositories);
  it('should createExample properly', async () => {
    const input: CreateExampleDto = {
      email: 'test@email.com',
      role: 'role',
      username: 'username',
    };

    const output = await createExampleUseCase.execute(input);

    expect(output.id).toBeDefined();
  });

  it('throw createExample if email exists', async () => {
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
