import { ApiProperty } from '@nestjs/swagger';
import { ExampleSchema } from '../../entities/example.entity';

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
