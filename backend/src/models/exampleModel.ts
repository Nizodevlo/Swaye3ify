import { Document, model, Schema } from 'mongoose';
import { IExample } from './../types/exampleTypes';

interface IExampleModelSchema extends IExample, Document {}

const exmapleSchema = new Schema<IExampleModelSchema>({
  exmaple: {
    type: String,
    required: true,
  },
});

const Example = model('Example', exmapleSchema);

export { Example, IExampleModelSchema };


// THis an exmaple to use to create a model