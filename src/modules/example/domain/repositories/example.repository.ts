import { Repository } from '../../../../base/repository';
import { Example } from '../entities/example.entity';

export abstract class ExampleRepository extends Repository<Example> {
  abstract emailExists(email: string): Promise<boolean>;
}
