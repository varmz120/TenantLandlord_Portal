// For more information about this file see https://dove.feathersjs.com/guides/cli/application.html
import * as dotenv from 'dotenv';
dotenv.config();

import fs from 'fs/promises';
import { feathers } from '@feathersjs/feathers';
import configuration from '@feathersjs/configuration';
import {
  koa,
  rest,
  bodyParser,
  errorHandler,
  parseAuthentication,
  cors,
  serveStatic,
} from '@feathersjs/koa';

import { configurationValidator } from './configuration';
import type { Application } from './declarations';
import { logError } from './hooks/log-error';
import { mongodb } from './mongodb';
import { authentication } from './authentication';
import { services } from './services/index';

const app: Application = koa(feathers());

// Load our app configuration (see config/ folder)
app.configure(configuration(configurationValidator));

// Set up Koa middleware
app.use(cors());
app.use(serveStatic(app.get('public')));
app.use(errorHandler());
app.use(parseAuthentication());
app.set('paginate', {
  default: 100, 
  max: 200, 
});
app.use(
  bodyParser({
    multipart: true,
    formidable: {
      keepExtensions: true,
      filter: (file) =>
        file.mimetype !== null &&
        (file.mimetype.includes('image') || file.mimetype == 'application/pdf'),
    },
  })
);
app.use(async (ctx, next) => {
  if (ctx.request.files) {
    Object.entries(ctx.request.files).forEach(([fileProp, files]) => {
      if (Array.isArray(files)) {
        ctx.request.body[fileProp] = files.map((f) => f.filepath);
      } else {
        ctx.request.body[fileProp] = files.filepath;
      }
    });
  }

  await next();

  if (ctx.request.files && ctx.status >= 300) {
    await Promise.all(
      Object.values(ctx.request.files)
        .flat()
        .map((f) => fs.rm(f.filepath))
    );
  }
});
app.use(serveStatic('./uploads'));

// Configure services and transports
app.configure(rest());
app.configure(mongodb);
app.configure(authentication);
app.configure(services);

// Register hooks that run on all service methods
app.hooks({
  around: {
    // Disable log error hook for tests so that output isn't polluted for error tests
    all: process.env.NODE_ENV === 'test' && !process.env.VERBOSE ? [] : [logError],
  },
  before: {},
  after: {},
  error: {},
});
// Register application setup and teardown hooks here
app.hooks({
  setup: [],
  teardown: [],
});

export { app };
