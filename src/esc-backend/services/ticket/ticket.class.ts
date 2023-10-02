// For more information about this file see https://dove.feathersjs.com/guides/cli/service.class.html#database-services
import type { Params } from '@feathersjs/feathers';
import { MongoDBService } from '@feathersjs/mongodb';
import type { MongoDBAdapterParams, MongoDBAdapterOptions } from '@feathersjs/mongodb';

import type { Application } from '../../declarations';
import type {
  Quotation,
  Ticket,
  TicketData,
  PersonnelAssigned,
  TicketQuery,
  Feedback,
  TicketId,
  TicketPatch,
  TicketQuotation,
  TicketFeedback,
} from './ticket.schema';
import { TicketStatus, QuotationStatus } from './ticket.schema';
import { Forbidden, NotAuthenticated } from '@feathersjs/errors';
import { UserType } from '../users/users.schema';
import { UserService } from '../users/users.class';

export type {
  Ticket,
  TicketData,
  TicketQuery,
  Quotation,
  PersonnelAssigned,
  Feedback,
  TicketId,
  TicketQuotation,
  TicketFeedback,
};

export interface TicketParams extends MongoDBAdapterParams<TicketQuery> {}

// By default calls the standard MongoDB adapter service methods but can be customized with your own functionality.
export class TicketService<ServiceParams extends Params = TicketParams> extends MongoDBService<
  Ticket,
  TicketData,
  TicketParams,
  TicketPatch
> {
  userService?: UserService;

  invalidStateTransition(status: TicketStatus) {
    throw new Forbidden({ msg: 'State transition not allowed', status });
  }

  async setup(app: Application) {
    this.userService = app.service('users');
  }

  async pushNotification(userId: string, msg: string) {
    if (process.env.NODE_ENV !== 'test') {
      await this.userService?.pushNotification(userId, msg);
    }
  }

  async assignPersonnel(data: PersonnelAssigned, params?: ServiceParams): Promise<Ticket> {
    const ticket = await this.get(data.ticketId, params);

    if (
      ticket.status !== TicketStatus.Opened &&
      ticket.status !== TicketStatus.InQueue &&
      ticket.status !== TicketStatus.InProgress
    ) {
      this.invalidStateTransition(ticket.status);
    }

    if (ticket.status === TicketStatus.Opened) {
      ticket.status = TicketStatus.InQueue;
    }

    const result = await this._patch(
      data.ticketId,
      {
        personnelAssigned: data.personnelId,
        status: ticket.status,
      },
      params
    );

    await this.pushNotification(
      ticket.userId,
      `${data.personnelId} has been assigned to your ticket #${ticket._id}`
    );

    return result;
  }

  async unassignPersonnel(data: TicketId, params?: ServiceParams): Promise<Ticket> {
    const ticket = await this.get(data.ticketId, params);

    if (ticket.status !== TicketStatus.InQueue) {
      this.invalidStateTransition(ticket.status);
    }

    const result = await this._patch(
      data.ticketId,
      {
        status: TicketStatus.Opened,
        $unset: { personnelAssigned: '' },
      },
      params
    );

    await this.pushNotification(
      ticket.userId,
      `${ticket.personnelAssigned} has been unassigned to your ticket #${ticket._id}`
    );

    return result;
  }

  async moveInProgress(data: TicketId, params?: ServiceParams): Promise<Ticket> {
    const ticket = await this.get(data.ticketId, params);
    if (ticket.status !== TicketStatus.InQueue) {
      this.invalidStateTransition(ticket.status);
    }

    const result = await this._patch(
      data.ticketId,
      {
        status: TicketStatus.InProgress,
        quotStatus: QuotationStatus.NotRequired,
      },
      params
    );

    await this.pushNotification(
      ticket.userId,
      `Ticket #${ticket._id} requires no quotation. Work will start soon.`
    );

    return result;
  }

  async uploadQuotation(data: TicketQuotation, params?: ServiceParams): Promise<Ticket> {
    const ticket = await this.get(data.ticketId, params);
    if (ticket.status !== TicketStatus.InQueue) {
      this.invalidStateTransition(ticket.status);
    }

    if (params === undefined || params.user === undefined) {
      throw new NotAuthenticated();
    }

    const result = await this._patch(
      data.ticketId,
      {
        status: TicketStatus.WaitingForQuotApproval,
        quotation: {
          amount: data.amount,
          remarks: data.remarks,
          uri: data.uri,
          uploadedBy: params?.user._id,
        },
        quotStatus: QuotationStatus.Uploaded,
      },
      params
    );

    await this.pushNotification(
      ticket.userId,
      `A quotation has been uploaded for ticket #${ticket._id} and requires approval.`
    );

    return result;
  }

  async approveQuotation(data: TicketId, params?: ServiceParams): Promise<Ticket> {
    const ticket = await this.get(data.ticketId, params);
    if (ticket.status !== TicketStatus.WaitingForQuotApproval) {
      this.invalidStateTransition(ticket.status);
    }

    const result = await this._patch(
      data.ticketId,
      {
        status: TicketStatus.InProgress,
        quotation: { ...ticket.quotation, acceptedOn: new Date().getTime() },
      },
      params
    );

    if (ticket.personnelAssigned) {
      await this.pushNotification(
        ticket.personnelAssigned,
        `Quotation has been approved for ticket #${ticket._id}.`
      );
    }

    return result;
  }

  async rejectQuotation(data: TicketId, params?: ServiceParams): Promise<Ticket> {
    const ticket = await this.get(data.ticketId, params);
    if (ticket.status !== TicketStatus.WaitingForQuotApproval) {
      this.invalidStateTransition(ticket.status);
    }

    const result = await this._patch(
      data.ticketId,
      {
        status: TicketStatus.InQueue,
      },
      params
    );

    if (ticket.personnelAssigned) {
      await this.pushNotification(
        ticket.personnelAssigned,
        `Quotation has been rejected for ticket #${ticket._id}.`
      );
    }

    return result;
  }

  async rejectTicket(data: TicketId, params?: ServiceParams): Promise<Ticket> {
    const ticket = await this.get(data.ticketId, params);
    if (ticket.status !== TicketStatus.Opened) {
      this.invalidStateTransition(ticket.status);
    }

    const result = await this._patch(
      data.ticketId,
      {
        status: TicketStatus.Rejected,
      },
      params
    );

    await this.pushNotification(
      ticket.userId,
      `Ticket #${ticket._id} has been rejected. Contact your landlord for more information.`
    );

    return result;
  }

  async reopenTicket(data: TicketId, params?: ServiceParams): Promise<Ticket> {
    // Both LANDLORD and TENANT can reopen ticket
    const ticket = await this.get(data.ticketId, params);

    if (ticket.status === TicketStatus.Rejected) {
      // Tenant cannot reopen the ticket when it has been rejected
      const userType = params?.user?.typ ?? UserType.Tenant;
      if (userType === UserType.Tenant) {
        throw new Forbidden('Insufficient permissions');
      }

      const result = await this._patch(
        data.ticketId,
        {
          status: TicketStatus.Opened,
        },
        params
      );

      await this.pushNotification(ticket.userId, `Ticket #${ticket._id} has been reopened.`);

      return result;
    } else if (ticket.status === TicketStatus.PendingCompletionApproval) {
      const result = await this._patch(
        data.ticketId,
        {
          status: TicketStatus.InQueue,
          quotStatus: QuotationStatus.Pending,
          $unset: { quotation: '', completedOn: '' },
        },
        params
      );

      if (ticket.personnelAssigned) {
        await this.pushNotification(
          ticket.personnelAssigned,
          `The tenant has reopened ticket #${ticket._id} as they are not satisfied with the work. Contact ${ticket.userId} for more information.`
        );
      }

      return result;
    } else {
      this.invalidStateTransition(ticket.status);
    }

    // This is unreachable
    return ticket;
  }

  async registerWorkFinished(data: TicketId, params?: ServiceParams): Promise<Ticket> {
    const ticket = await this.get(data.ticketId, params);
    if (ticket.status !== TicketStatus.InProgress) {
      this.invalidStateTransition(ticket.status);
    }

    const result = await this._patch(
      data.ticketId,
      {
        status: TicketStatus.PendingCompletionApproval,
        completedOn: new Date().getTime(),
      },
      params
    );

    await this.pushNotification(
      ticket.userId,
      `Ticket #${ticket._id} has been completed. Please verify the work to finish the ticket.`
    );

    return result;
  }

  async rateTicket(data: TicketFeedback, params?: ServiceParams): Promise<Ticket> {
    const ticket = await this.get(data.ticketId, params);
    if (
      ticket.status !== TicketStatus.Rejected &&
      ticket.status !== TicketStatus.PendingCompletionApproval
    ) {
      this.invalidStateTransition(ticket.status);
    }

    return await this._patch(
      data.ticketId,
      {
        status: TicketStatus.Closed,
        feedback: data.feedback,
      },
      params
    );
  }

  async closeTicket(data: TicketId, params?: ServiceParams): Promise<Ticket> {
    const ticket = await this.get(data.ticketId, params);
    if (ticket.status !== TicketStatus.Opened && ticket.status !== TicketStatus.InQueue) {
      this.invalidStateTransition(ticket.status);
    }

    const result = await this._patch(
      data.ticketId,
      {
        status: TicketStatus.Closed,
      },
      params
    );

    if (ticket.personnelAssigned) {
      await this.pushNotification(
        ticket.personnelAssigned,
        `Ticket #${ticket._id} has been closed as the tenant doesn't require it anymore.`
      );
    }

    return result;
  }
}

export const getOptions = (app: Application): MongoDBAdapterOptions => {
  return {
    paginate: app.get('paginate'),
    Model: app.get('mongodbClient').then((db) => db.collection('ticket')),
    disableObjectify: true,
  };
};
