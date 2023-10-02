// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema';
import { Type, getValidator, querySyntax } from '@feathersjs/typebox';
import type { Static, TSchema } from '@feathersjs/typebox';

import type { HookContext } from '../../declarations';
import { dataValidator, queryValidator } from '../../validators';
import { UserType } from '../users/users';
import { TicketService } from './ticket.class';

export enum TicketStatus {
  Opened,
  WaitingForQuotApproval,
  InQueue,
  InProgress,
  PendingCompletionApproval,
  Rejected,
  Closed,
}

export enum QuotationStatus {
  NotRequired,
  Pending,
  Uploaded,
}

export const contactSchema = Type.Object(
  {
    name: Type.String(),
    email: Type.String(),
    number: Type.String(),
  },
  { $id: 'Contact', additionalProperties: false }
);
export type Contact = Static<typeof contactSchema>;

export const quotationSchema = Type.Object(
  {
    amount: Type.Number(),
    remarks: Type.String(),
    uri: Type.String(),
    uploadedBy: Type.String(),
    acceptedOn: Type.Optional(Type.Number()),
  },
  { $id: 'Quotation', additionalProperties: false }
);
export type Quotation = Static<typeof quotationSchema>;

export const feedbackSchema = Type.Object(
  {
    rating: Type.Number(),
    description: Type.String(),
  },
  { $id: 'Feedback', additionalProperties: false }
);
export type Feedback = Static<typeof feedbackSchema>;

// Main data model schema
export const ticketSchema = Type.Object(
  {
    _id: Type.Number(),
    status: Type.Enum(TicketStatus),
    leaseId: Type.String(),
    userId: Type.String(),
    buildingId: Type.String(),
    title: Type.String(),
    description: Type.String(),
    attachements: Type.Array(Type.String()),
    requestType: Type.String(),
    contact: contactSchema,
    personnelAssigned: Type.Optional(Type.String()),
    openedOn: Type.Number(),
    quotStatus: Type.Enum(QuotationStatus),
    quotation: Type.Optional(quotationSchema),
    completedOn: Type.Optional(Type.Number()),
    feedback: Type.Optional(feedbackSchema),
  },
  { $id: 'Ticket', additionalProperties: false }
);
export type Ticket = Static<typeof ticketSchema>;
export const ticketValidator = getValidator(ticketSchema, dataValidator);
export const ticketResolver = resolve<Ticket, HookContext>({});

export const ticketExternalResolver = resolve<Ticket, HookContext>({});

// Schema for creating new entries
export const ticketDataSchema = Type.Pick(
  ticketSchema,
  ['leaseId', 'title', 'description', 'attachements', 'requestType', 'contact'],
  {
    $id: 'TicketData',
  }
);
export type TicketData = Static<typeof ticketDataSchema>;
export const ticketDataValidator = getValidator(ticketDataSchema, dataValidator);
export const ticketDataResolver = resolve<Ticket, HookContext<TicketService>>({
  _id: async (_value, _ticket, ctx) => {
    return await ctx.app.service('sequence-generator').nextValue('ticket-id');
  },
});

// Schema for updating existing entries
export const ticketQuotSchema = Type.Object(
  {
    ticketId: Type.Number(),
    amount: Type.Number(),
    remarks: Type.String(),
    uri: Type.String(),
  },
  { $id: 'TicketQuotation', additionalProperties: false }
);
export type TicketQuotation = Static<typeof ticketQuotSchema>;
export const ticketQuotValidator = getValidator(ticketQuotSchema, dataValidator);
export const ticketQuotResolver = resolve<TicketQuotation, HookContext>({});

export const ticketIdSchema = Type.Object(
  { ticketId: Type.Number() },
  { $id: 'TicketId', additionalProperties: false }
);
export type TicketId = Static<typeof ticketIdSchema>;
export const ticketIdValidator = getValidator(ticketIdSchema, dataValidator);
export const ticketIdResolver = resolve<TicketId, HookContext>({});

export const personnelAssignedSchema = Type.Object(
  { ticketId: Type.Number(), personnelId: Type.String() },
  { $id: 'PersonnelAssigned', additionalProperties: false }
);
export type PersonnelAssigned = Static<typeof personnelAssignedSchema>;
export const personnelAssignedValidator = getValidator(personnelAssignedSchema, dataValidator);
export const personnelAssignedResolver = resolve<PersonnelAssigned, HookContext>({});

export const ticketFeedbackSchema = Type.Object(
  { ticketId: Type.Number(), feedback: feedbackSchema },
  { $id: 'TicketFeedback', additionalProperties: false }
);
export type TicketFeedback = Static<typeof ticketFeedbackSchema>;
export const ticketFeedbackValidator = getValidator(ticketFeedbackSchema, dataValidator);
export const ticketFeedbackResolver = resolve<TicketFeedback, HookContext>({});

export const ticketPatchSchema = Type.Object(
  {
    status: Type.Optional(Type.Enum(TicketStatus)),
    personnelAssigned: Type.Optional(Type.String()),
    quotStatus: Type.Optional(Type.Enum(QuotationStatus)),
    quotation: Type.Optional(Type.Partial(quotationSchema)),
    completedOn: Type.Optional(Type.Number()),
    feedback: Type.Optional(Type.Partial(feedbackSchema)),
    $unset: Type.Optional(
      Type.Partial(
        Type.Object({
          quotation: Type.String(),
          personnelAssigned: Type.String(),
          completedOn: Type.String(),
        })
      )
    ),
  },
  { $id: 'TicketPatch', additionalProperties: false }
);
export type TicketPatch = Static<typeof ticketPatchSchema>;

// Schema for allowed query properties
export const ticketQueryProperties = Type.Pick(ticketSchema, [
  '_id',
  'leaseId',
  'personnelAssigned',
  'buildingId',
  'title',
  'requestType',
]);
export const ticketQuerySchema = Type.Intersect(
  [
    querySyntax(ticketQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false }),
  ],
  { additionalProperties: false }
);
export type TicketQuery = Static<typeof ticketQuerySchema>;
export const ticketQueryValidator = getValidator(ticketQuerySchema, queryValidator);
export const ticketQueryResolver = resolve<TicketQuery, HookContext>({
  // If there is a user (e.g. with authentication), they are only allowed to see their own data
  leaseId: async (value, ticket, context) => {
    if (context.params.user && context.params.user.typ === UserType.Tenant) {
      return context.params.user.leaseId;
    }

    return value;
  },
  personnelAssigned: async (value, ticket, context) => {
    if (context.params.user && context.params.user.typ === UserType.ServiceProvider) {
      return context.params.user._id;
    }

    return value;
  },
  buildingId: async (value, ticket, context) => {
    if (context.params.user && context.params.user.typ === UserType.Landlord) {
      return context.params.user.buildingId;
    }

    return value;
  },
});
