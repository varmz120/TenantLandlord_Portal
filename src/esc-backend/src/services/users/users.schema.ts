// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema';
import { Type, getValidator, querySyntax } from '@feathersjs/typebox';
import type { Static } from '@feathersjs/typebox';
import { passwordHash } from '@feathersjs/authentication-local';

import type { HookContext } from '../../declarations';
import { dataValidator, queryValidator } from '../../validators';

export enum UserType {
  Tenant = 0,
  ServiceProvider = 1,
  Landlord = 2,
  Admin = 3,
}

export const notificationSchema = Type.Object(
  {
    text: Type.String(),
    timestamp: Type.Number(),
  },
  { $id: 'Notification', additionalProperties: false }
);
export type Notification = Static<typeof notificationSchema>;

// Main data model schema
export const userSchema = Type.Object(
  {
    _id: Type.String(), // The username
    password: Type.Optional(Type.String()),
    typ: Type.Enum(UserType),
    email: Type.String({ format: 'email' }),
    resetPasswordToken: Type.Optional(Type.String()),
    // UTC millisecond timestamp
    resetPasswordExpiration: Type.Optional(Type.Number()),
    buildingId: Type.Optional(Type.String()),
    leaseId: Type.Optional(Type.String()),
    notifications: Type.Optional(Type.Array(notificationSchema)),
  },
  { $id: 'User', additionalProperties: false }
);
export type User = Static<typeof userSchema>;
export const userValidator = getValidator(userSchema, dataValidator);
export const userResolver = resolve<User, HookContext>({});
export const userExternalResolver = resolve<User, HookContext>({
  // The password should never be visible externally
  password: async () => undefined,
  resetPasswordToken: async () => undefined,
  resetPasswordExpiration: async () => undefined,
});

// Schema for creating new entries
export const userDataSchema = Type.Pick(
  userSchema,
  ['_id', 'password', 'email', 'typ', 'buildingId', 'leaseId'],
  {
    $id: 'UserData',
  }
);
export type UserData = Static<typeof userDataSchema>;
export const userDataValidator = getValidator(userDataSchema, dataValidator);
export const userDataResolver = resolve<User, HookContext>({
  password: passwordHash({ strategy: 'local' }),
  resetPasswordToken: passwordHash({ strategy: 'local' }),
});

// Schema for updating existing entries
export const userPatchSchema = Type.Partial(userSchema, {
  $id: 'UserPatch',
});
export type UserPatch = Static<typeof userPatchSchema>;
export const userPatchValidator = getValidator(userPatchSchema, dataValidator);
export const userPatchResolver = resolve<User, HookContext>({
  password: passwordHash({ strategy: 'local' }),
  resetPasswordToken: passwordHash({ strategy: 'local' }),
});

// Schema for allowed query properties
export const userQueryProperties = Type.Pick(userSchema, ['_id', 'typ', 'buildingId']);
export const userQuerySchema = Type.Intersect(
  [
    querySyntax(userQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false }),
  ],
  { additionalProperties: false }
);
export type UserQuery = Static<typeof userQuerySchema>;
export const userQueryValidator = getValidator(userQuerySchema, queryValidator);
export const userQueryResolver = resolve<UserQuery, HookContext>({
  // If there is a user (e.g. with authentication), they are only allowed to see their own data
  _id: async (value, user, context) => {
    if (
      context.params.user &&
      context.params.user.typ !== UserType.Admin &&
      context.params.user.typ !== UserType.Landlord &&
      context.method !== 'get'
    ) {
      return context.params.user._id;
    }

    return value;
  },
  buildingId: (value, user, context) => {
    if (context.params.user && context.params.user.typ === UserType.Landlord) {
      return context.params.user.buildingId;
    }

    return value;
  },
});
