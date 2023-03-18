import { InMemoryExampleRepository } from '../../modules/example/adapters/db-in-memory/example.repository';
import { IRepositories } from '../types/repositories';

export const repositories: IRepositories = {
  example: new InMemoryExampleRepository(),
};
