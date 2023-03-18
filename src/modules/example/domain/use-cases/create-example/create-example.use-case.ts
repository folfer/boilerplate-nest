import { ConflictException } from '@nestjs/common';
import { IRepositories } from '../../../../../shared/types/repositories';
import { Example } from '../../entities/example.entity';
import { CreateExampleDto, CreateExampleInput } from './create-example.dto';

export class CreateExampleUseCase {
  repositories: IRepositories;

  constructor(repositories: IRepositories) {
    this.repositories = repositories;
  }

  async execute(data: CreateExampleDto): Promise<Example> {
    const { email, role, username } = CreateExampleInput.parse(data);

    const emailExists = await this.repositories.example.emailExists(email);

    if (emailExists) {
      throw new ConflictException('emailAlreadyExists');
    }

    const response = await this.repositories.example.create({
      email,
      role,
      username,
    });

    return response;
  }
}
