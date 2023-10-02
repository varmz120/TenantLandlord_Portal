// For more information about this file see https://dove.feathersjs.com/guides/cli/service.shared.html
import type { Params } from '@feathersjs/feathers';
import type { ClientApplication } from '../../client';
import type {
  Quotation,
  Ticket,
  TicketData,
  PersonnelAssigned,
  TicketQuery,
  Feedback,
  TicketService,
} from './ticket.class';

export type { Ticket, TicketData, TicketQuery, Quotation, PersonnelAssigned, Feedback };

export type TicketClientService = Pick<
  TicketService<Params<TicketQuery>>,
  (typeof ticketMethods)[number]
>;

export const ticketPath = 'ticket';

export const ticketMethods = [
  'find',
  'get',
  'create',
  'remove',
  'uploadQuotation',
  'approveQuotation',
  'rejectQuotation',
  'assignPersonnel',
  'unassignPersonnel',
  'rejectTicket',
  'rateTicket',
  'reopenTicket',
  'moveInProgress',
  'registerWorkFinished',
  'closeTicket',
] as const;

export const ticketClient = (client: ClientApplication) => {
  const connection = client.get('connection');

  client.use(ticketPath, connection.service(ticketPath), {
    methods: ticketMethods,
  });
};

// Add this service to the client service type index
declare module '../../client' {
  interface ServiceTypes {
    [ticketPath]: TicketClientService;
  }
}
