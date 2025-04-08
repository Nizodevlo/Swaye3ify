import { myDataSource } from '../config/db';
import { Example } from '../entities/exampleEntity';

export class ExampleRepository {
  static exampleRepository = myDataSource.getRepository(Example);

  public static async createSomething(data: Example): Promise<Example> {
    const example = this.exampleRepository.create(data);
    return await this.exampleRepository.save(example);
  }

  // add the required methods here ex: getSomething / update... / ...
}
