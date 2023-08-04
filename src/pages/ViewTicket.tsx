import AreaField from '../components/AreaField';
import LineField from '../components/LineField';
import Gallery from '../components/Gallery';
import Status from '../components/Status';
import ActionRequired from '../components/ActionRequired';
import BackButton from '../components/BackButton';
import ActionButton from '../components/ActionButton';
import { useNavigate, useLocation, Navigate } from 'react-router-dom';
import React, { useContext, MouseEvent } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { Ticket } from '../esc-backend/src/client';
import { client } from '../client';

export enum TicketStatus {
  Opened,
  WaitingForQuotApproval,
  InQueue,
  InProgress,
  PendingCompletionApproval,
  Rejected,
  Closed,
}

function ViewTicket() {
  // Navigation & routing
  const navigate = useNavigate();
  const locate = useLocation();

  const ticket: Ticket = locate.state;

  // Context
  const { user } = useContext(AuthContext);

  // Handlers
  const handleCloseTicket = (event: MouseEvent<HTMLButtonElement | HTMLDivElement>): void => {
    event.preventDefault();

    client.service('ticket').closeTicket({ ticketId: ticket._id }).then(() => {
      navigate('/tenantDashboard');
    });
  };

  return (
    <React.Fragment>
      {/* // When user is not logged in */}
      {user === null ? (
        <Navigate to="/403" replace={true} />
      ) : (
        <React.Fragment>
          {/* // When user is logged in AND a tenant */}
          {user?.typ === 0 ? (
            <div className="flex flex-col font-3xl" id="viewTicket">
              <BackButton
                type="button"
                label={'all tickets'}
                handleClick={() => navigate('/tenantDashboard')}
              />
              <div className="flex justify-center">
                <p className="text-headerText pb-5 text-2xl font-medium">
                  Service Ticket #{ticket._id}
                </p>
              </div>
              <div className="flex flex-row justify-center">
                <div className="flex w-fit bg-form border-gray-200 rounded-lg shadow sm:p-7">
                  <form className="space-y-4">
                    <div className="flex flex-row w-full">
                      <p className="flex text-lg text-left font-medium">{ticket.title}</p>
                      {ticket.quotation ? (
                        <ActionButton
                          value={'View Quote'}
                          padding_right={'30'}
                          type="quote"
                          firstViewState={false}
                          toggle={false}
                          onClick={() => navigate('/viewQuote', { state: ticket })}
                        />
                      ) : null}
                    </div>
                    <hr className="h-[1px] bg-gray-300 border-0 drop-shadow-md"></hr>
                    <LineField
                      type={'text'}
                      label="Category"
                      padding_right="50"
                      value={ticket.requestType}
                      name="category"
                      placeholder={''}
                      error={''}
                      disabled={true}
                      layout=""
                      classnames="w-1/3"
                      onChange={() => null}
                    />
                    <AreaField
                      label={'Description'}
                      classnames="w-4/5"
                      padding_right={'32'}
                      value={ticket.description}
                      id="description"
                      disabled={true}
                      layout=""
                      error={''}
                      placeholder="Please inclue any additional remarks here."
                      onChange={() => null}
                    />
                    <Gallery
                     label={'Attachments'} 
                     value={ticket.attachements}
                     padding_right={'0'} />
                    <hr className="h-[2px] bg-gray-300 border-0 drop-shadow-md"></hr>
                    <div className="grid grid-cols-2 pt-1">
                      <Status label={'Status'} value={ticket.status} padding_right={'0'} />
                      <div className="flex flex-col pt-1">
                        {ticket.status === TicketStatus.Closed ? (
                          <ActionRequired
                            label={'Action Required'}
                            padding_right={'32'}
                            alert={false}
                          />
                        ) : (
                          <ActionRequired
                            label={'Action Required'}
                            padding_right={'32'}
                            alert={true}
                          />
                        )}
                        <div className="flex flex-col gap-y-4">
                          {ticket.status === TicketStatus.PendingCompletionApproval ? (
                            <ActionButton
                              value={'Rate Ticket'}
                              padding_right={'30'}
                              type=""
                              firstViewState={false}
                              toggle={false}
                              onClick={() => navigate('/feedbackSurvey', { state: ticket })}
                            />
                          ) : null}
                          {ticket.status === TicketStatus.WaitingForQuotApproval ? (
                            <ActionButton
                              value={'View Quote'}
                              padding_right={'30'}
                              type=""
                              firstViewState={false}
                              toggle={false}
                              onClick={() => navigate('/viewQuote', { state: ticket })}
                            />
                          ) : null}
                          {ticket.status === TicketStatus.Opened || ticket.status === TicketStatus.InQueue ? (
                            <ActionButton
                              value={'Close Ticket'}
                              padding_right={'30'}
                              type=""
                              firstViewState={false}
                              toggle={false}
                              onClick={handleCloseTicket}
                            />
                          ) : null}
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
                <div className="ml-2 w-3/7 flex h-fit bg-form border-gray-200 rounded-lg shadow sm:p-7">
                  <div className="space-y-4">
                    <p className="text-lg text-left font-medium">Personnel Assigned</p>
                    <hr className="h-[1px] bg-gray-300 border-0 drop-shadow-md"></hr>
                    {ticket.personnelAssigned ? (
                      <LineField
                        type={'text'}
                        label="Name"
                        padding_right="65"
                        value={ticket.personnelAssigned}
                        name="landlord"
                        placeholder={''}
                        error={''}
                        disabled={true}
                        layout=""
                        classnames="w-3/5"
                        onChange={() => null}
                      />
                    ) : (
                      <p className="font-medium text-left">None</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            // When user is logged in but NOT a tenant OR in this case of demo, no submission of tenant ticket was made...
            <Navigate to="/403" replace={true} />
          )}
        </React.Fragment>
      )}
    </React.Fragment>
  );
}

export default ViewTicket;
