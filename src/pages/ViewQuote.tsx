import AreaField from '../components/AreaField';
import LineField from '../components/LineField';
import ActionRequired from '../components/ActionRequired';
import BackButton from '../components/BackButton';
import ActionButton from '../components/ActionButton';

import { useNavigate, useLocation, Navigate } from 'react-router-dom';
import React, { MouseEvent, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { Ticket } from '../esc-backend/src/client';
import { client } from '../client';

// TODO: Pass in Blob URIs here from MongoDB and test here
// const getPdfUrl = async (path: string) => {
//   const url = path;

//   const response = await fetch(url);
//   const blob = await response.blob();

//   return URL.createObjectURL(blob);
// };

function ViewQuote() {
  // Navigation & routing
  const navigate = useNavigate();
  const locate = useLocation();
  const ticket: Ticket | undefined = locate.state;

  // Context
  const { user } = useContext(AuthContext);

  const handleAcceptClick = (event: MouseEvent<HTMLButtonElement>): void => {
    client.service('ticket').approveQuotation({ ticketId: ticket?._id ?? 0 })
      .then(() => navigate('/viewDetails', { state: ticket }));
  };

  const handleRejectClick = (event: MouseEvent<HTMLButtonElement>): void => {
    client.service('ticket').rejectQuotation({ ticketId: ticket?._id ?? 0 })
      .then(() => navigate('/viewDetails', { state: ticket }));
  };

  return (
    <React.Fragment>
      {/* // When user is not logged in */}
      {user === null ? (
        <Navigate to="/401" replace={true} />
      ) : (
        <React.Fragment>
          {/* // When user is logged in AND a tenant */}
          {user?.typ === 0 && ticket && ticket.quotation ? (
            <div className="flex flex-col font-3xl" id="viewTicket">
              <BackButton
                type="button"
                label={'ticket details'}
                handleClick={() => navigate('/viewDetails', { state: ticket })}
              />
              <div className="flex justify-center">
                <p className="text-headerText pb-5 text-2xl font-medium">
                  Quotation for #{ticket._id}
                </p>
              </div>
              <div className="flex mx-auto my-auto max-w-content bg-form border-gray-200 rounded-lg shadow sm:p-7">
                <div className="grid grid-cols-2">
                  <form className="space-y-5">
                    <p className="text-lg text-left font-medium">{ticket.title}</p>
                    <hr className="h-[1px] bg-gray-300 border-0 drop-shadow-md"></hr>
                    <LineField
                      type={'text'}
                      label="Uploaded by"
                      padding_right="106"
                      value={ticket.quotation.uploadedBy}
                      name="landlord"
                      placeholder={''}
                      error={''}
                      disabled={true}
                      layout=""
                      classnames="w-2/5"
                      onChange={() => null}
                    />
                    <LineField
                      type={'text'}
                      label="Total Amount (SGD)"
                      padding_right="50"
                      value={ticket.quotation.amount}
                      name="amount"
                      placeholder={''}
                      error={''}
                      disabled={true}
                      layout=""
                      classnames="w-2/5"
                      onChange={() => null}
                    />
                    <AreaField
                      label={'Description'}
                      classnames="w-4/5"
                      padding_right={'115'}
                      value={ticket.quotation.remarks}
                      id="description"
                      disabled={true}
                      layout=""
                      error={''}
                      placeholder="Please inclue any additional remarks here."
                      onChange={() => null}
                    />
                    <hr className="h-[2px] bg-gray-300 border-0 drop-shadow-md"></hr>
                    {ticket.status === 1 ? (
                      <React.Fragment>
                        <ActionRequired
                          label={'Action Required'}
                          padding_right={'0'}
                          alert={true}
                        />
                        <div className="flex flex-row gap-x-4">
                          <ActionButton
                            value={'Accept'}
                            padding_right={'0'}
                            type="accept"
                            firstViewState={false}
                            toggle={false}
                            onClick={handleAcceptClick}
                          />
                          <ActionButton
                            value={'Reject'}
                            padding_right={'0'}
                            type="reject"
                            firstViewState={false}
                            toggle={false}
                            onClick={handleRejectClick}
                          />
                        </div>
                      </React.Fragment>
                    ) : (
                      <ActionRequired label={'Action Required'} padding_right={'0'} alert={false} />
                    )}
                  </form>
                  <div className="border-l-2 border-gray-300 drop-shadow-md items-center">
                    <p className="text-lg text-left font-medium text-headerText text-center">
                      Document View
                    </p>
                    <iframe src={`http://localhost:3030/${ticket.quotation.uri}`} title='alert' className='flex mx-auto h-4/5 w-2/3'/>
                    <ActionButton
                      value={'Download Quote'}
                      padding_right={'0'}
                      type="download"
                      firstViewState={false}
                      toggle={false}
                      onClick={() => null}
                    />
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

export default ViewQuote;
