import { ConflictException } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { IRepositories } from '../../../../../shared/types/repositories';
import { Example, ExampleSchema } from '../../entities/example.entity';

export const CreateExampleInput = ExampleSchema.pick({
  email: true,
  role: true,
  username: true,
});

export class CreateExampleDto {
  @ApiProperty({ description: 'Example Email' })
  email!: string;

  @ApiProperty({ description: 'Example Role' })
  role!: string;

  @ApiProperty({ description: 'Example Username' })
  username!: string;
}

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
