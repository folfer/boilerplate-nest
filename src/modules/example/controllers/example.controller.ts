import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { zodErrorParse } from '../../../shared/errors/zodErrorParser';
import { Example } from '../domain/entities/example.entity';
import { exampleUseCases } from '../domain/use-cases';
import { CreateExampleDto } from '../domain/use-cases/create-example/create-example.use-case';

@ApiTags('Example')
@Controller('/example')
export class ExampleController {
  useCases: typeof exampleUseCases;

  constructor() {
    this.useCases = exampleUseCases;
  }

  @Post('/create')
  async register(@Body() createExampleDto: CreateExampleDto): Promise<Example> {
    try {
      return await this.useCases.createExample.execute(createExampleDto);
    } catch (err) {
      if (err?.issues) {
        const error = zodErrorParse(err);
        throw new BadRequestException(error);
      }

      throw err;
    }
  }
}
