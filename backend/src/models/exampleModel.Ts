import { Document, model, Schema } from 'mongoose';
import { IExmaple } from '../types/exmapleTypes';


interface IExampleSchema extends IExmaple {}

const exampleSchema = new Schema<IExampleSchema>({
    example: {
        type: String,
    },
});

const Example = model('Example', exampleSchema);

export { Example, IExampleSchema };