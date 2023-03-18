import { Module } from '@nestjs/common';
import { ExampleController } from './controllers/example.controller';

@Module({
  imports: [],
  controllers: [ExampleController],
  providers: [],
})
export class ExampleModule {}
