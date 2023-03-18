import { PrismaExampleRepository } from './modules/example/adapters/prisma/prisma-example.repository';
import { IRepositories } from './shared/types/repositories';

export const repositories: IRepositories = {
  example: new PrismaExampleRepository(),
};
