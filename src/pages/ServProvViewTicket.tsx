import AreaField from '../components/AreaField';
import LineField from '../components/LineField';
import Gallery from '../components/Gallery';
import Status from '../components/Status';
import BackButton from '../components/BackButton';
import LandlordNavbar from '../components/LandlordNavbar';
import { useNavigate, useLocation } from 'react-router-dom';
import { useState, MouseEvent, useContext, useEffect } from 'react';
import ReactModal from 'react-modal';
import ActionRequired from '../components/ActionRequired';
import ActionButton from '../components/ActionButton';
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

const ServProvViewTicket = () => {
  const navigate = useNavigate();
  const locate = useLocation();
  const ticket: Ticket = locate.state;

  const { user } = useContext(AuthContext);

  const [, setUserIsActive] = useState(false);
  const [openPopUp, setopenPopUp] = useState(false);

  const handleUserActive = () => {
    setUserIsActive(true);
  };
  const handleUserInactive = () => {
    setUserIsActive(false);
  };

  const handleBack = () => {
    navigate('/ServProvDashboard');
  };

  const closePopUp = () => {
    setopenPopUp(false);
  };

  const handleFinishWorks = (event: MouseEvent<HTMLButtonElement | HTMLDivElement>): void => {
    event.preventDefault();

    client
      .service('ticket')
      .registerWorkFinished({ ticketId: ticket._id })
      .then(() => {
        navigate('/landlordDashboard');
      });
  };

  const handleViewFeedback = (event: MouseEvent<HTMLButtonElement | HTMLDivElement>): void => {
    event.preventDefault();

    navigate('/LandlordViewFeedback', { state: ticket });
  }
    // TODO: get contact details from assignedPerson

  useEffect(() => {
    if (openPopUp) {
      setTimeout(() => {
        closePopUp();
        navigate('/landlordDashboard');
      }, 1000); // 1 second
    }
  }, [openPopUp]);

  return (
    <div className="flex flex-col h-screen bg-[#ECEDED]">
      <LandlordNavbar />
      <div className="flex flex-col font-3xl" id="viewTicket">
        <BackButton type="button" label={'all tickets'} handleClick={handleBack} />
        <div className="flex justify-center">
          <p className="text-headerText pb-5 text-2xl font-medium">Service Ticket #{ticket._id}</p>
        </div>
        <div className="flex flex-row justify-center">
          <div className="flex w-fit bg-white border-gray-200 rounded-lg shadow sm:p-7">
            <form className="space-y-4">
              <p className="text-lg text-left font-medium">{ticket.title}</p>
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
                placeholder="Please include any additional remarks here."
                onChange={() => null}
              />
              <Gallery label={'Attachments'} values={ticket?.attachements} padding_right={'0'} />
              <hr className="h-[2px] bg-gray-300 border-0 drop-shadow-md"></hr>
              <div className="grid grid-cols-2 pt-1">
                <Status label={'Status'} value={ticket.status} padding_right={'0'} />
                <div className="flex flex-col pt-1">
                  {ticket.status === TicketStatus.PendingCompletionApproval ||
                  ticket.status === TicketStatus.WaitingForQuotApproval ? (
                    <ActionRequired label={'Action Required'} padding_right={'32'} alert={false} />
                  ) : (
                    <ActionRequired label={'Action Required'} padding_right={'32'} alert={true} />
                  )}
                  <div className="flex flex-col gap-y-4">
                    {ticket.status === TicketStatus.Closed ? (
                        <>
                          <ActionButton
                            value={"View Feedback"} // View Feedback
                            padding_right={'30'}
                            type=""
                            firstViewState={false}
                            toggle={false}
                            onClick={handleViewFeedback}
                          />
                        </>
                      ) : null}
                    {ticket.status === TicketStatus.InProgress ? (
                      <>
                        <ActionButton
                          value={'Finish Works'}
                          padding_right={'30'}
                          type=""
                          firstViewState={false}
                          toggle={false}
                          onClick={handleFinishWorks}
                        />
                      </>
                    ) : null}
                  </div>
                </div>
              </div>
            </form>
          </div>
          <div className="ml-2 w-3/7 flex h-fit bg-white border-gray-200 rounded-lg shadow sm:p-7">
            <div className="space-y-4">
              <p className="text-lg text-left font-medium">Landlord Assigned</p>
              <hr className="h-[1px] bg-gray-300 border-0 drop-shadow-md"></hr>
              {ticket.personnelAssigned ? (
                <LineField
                  type={'text'}
                  label="Name"
                  padding_right="85"
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
              {ticket.contact ? (
                <LineField
                  type={'text'}
                  label="Tenant Contact"
                  padding_right="20"
                  value={ticket.contact.number + ' (' + ticket.contact.email + ')'}
                  name="landlordCtc"
                  placeholder={''}
                  error={''}
                  disabled={true}
                  layout=""
                  classnames="w-3/5"
                  onChange={() => null}
                />
              ) : (
                <p className="font-medium text-left"></p>
              )}
              <hr className="h-[1px] bg-gray-300 border-0 drop-shadow-md"></hr>
              <div>
                <ReactModal
                  isOpen={openPopUp}
                  contentLabel="Example Modal"
                  className="flex items-center justify-center mt-40"
                  overlayClassName="fixed inset-0 bg-gray-500 bg-opacity-75"
                  onRequestClose={() => setopenPopUp(false)}>
                  <div className="bg-white p-4 rounded-lg max-w-sm">
                    <div className="text-2xl text-center">Personnel Unassigned</div>
                  </div>
                </ReactModal>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ServProvViewTicket;