import { repositories } from '../../../../dependencies';
import { CreateExampleUseCase } from './create-example/create-example.use-case';

export const exampleUseCases = {
  createExample: new CreateExampleUseCase(repositories),
};
