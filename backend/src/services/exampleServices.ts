import { Example } from '../entities/exampleEntity';
import { ExampleRepository } from '../repositories/exampleRepository';

export class ExampleService {
  public static async createSomething(data: Example): Promise<Example> {
    return await ExampleRepository.createSomething(data);
  }

  //   Add the required methods: getSomethings / update... / ..
}
