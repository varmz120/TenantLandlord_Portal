// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html

import type { Application } from '../../declarations';
import { SequenceGeneratorService, getOptions } from './sequence-generator.class';
import { sequenceGeneratorPath, sequenceGeneratorMethods } from './sequence-generator.shared';

export * from './sequence-generator.class';
export * from './sequence-generator.schema';

// A configure function that registers the service and its hooks via `app.configure`
export const sequenceGenerator = (app: Application) => {
  // Register our service on the Feathers application
  app.use(sequenceGeneratorPath, new SequenceGeneratorService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: sequenceGeneratorMethods,
    // You can add additional custom events to be sent to clients here
    events: [],
  });
  // Initialize hooks
  app.service(sequenceGeneratorPath).hooks({
    around: {},
    before: {
      all: [],
    },
    after: {
      all: [],
    },
    error: {
      all: [],
    },
  });
};

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    [sequenceGeneratorPath]: SequenceGeneratorService;
  }
}
