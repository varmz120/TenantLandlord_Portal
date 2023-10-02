// For more information about this file see https://dove.feathersjs.com/guides/cli/service.class.html#database-services
import type { Params } from '@feathersjs/feathers';
import { MongoDBService } from '@feathersjs/mongodb';
import type { MongoDBAdapterParams, MongoDBAdapterOptions } from '@feathersjs/mongodb';

import type { Application } from '../../declarations';
import type { SequenceGenerator } from './sequence-generator.schema';

export type { SequenceGenerator };

export interface SequenceGeneratorParams extends MongoDBAdapterParams<{}> {}

// By default calls the standard MongoDB adapter service methods but can be customized with your own functionality.
export class SequenceGeneratorService<
  ServiceParams extends Params = SequenceGeneratorParams
> extends MongoDBService<
  SequenceGenerator,
  SequenceGenerator,
  SequenceGeneratorParams,
  SequenceGenerator
> {
  async setup() {
    const model = await this.getModel();
    try {
      await model.insertOne({
        _id: 'ticket-id' as any,
        value: 0,
      });
    } catch (e) {}
  }

  async nextValue(_id: string): Promise<number> {
    const model = await this.getModel();
    const sequence = await model.findOneAndUpdate(
      { _id } as any,
      { $inc: { value: 1 } },
      { returnDocument: 'after' }
    );

    if (sequence.value !== null) {
      return sequence.value.value;
    } else {
      throw new Error("Couldn't generate next sequence value");
    }
  }
}

export const getOptions = (app: Application): MongoDBAdapterOptions => {
  return {
    paginate: app.get('paginate'),
    Model: app.get('mongodbClient').then((db) => db.collection('sequence-generator')),
  };
};
