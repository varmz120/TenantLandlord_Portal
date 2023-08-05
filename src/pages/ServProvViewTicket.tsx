import AreaField from '../components/AreaField';
import LineField from '../components/LineField';
import Gallery from '../components/Gallery';
import Status from '../components/Status';
import BackButton from '../components/BackButton';
import Navbar from '../components/Navbar';
import { useNavigate, useLocation } from 'react-router-dom';
import { useState, MouseEvent, useContext, useEffect } from 'react';
import ReactModal from 'react-modal';
import ActionRequired from '../components/ActionRequired';
import ActionButton from '../components/ActionButton';
import { AuthContext } from '../contexts/AuthContext';
import { Ticket } from '../esc-backend/src/client';
import { client } from '../client';
import ActionUnassignButton from '../components/ActionUnassignButtonp';


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
  const navigate = useNavigate();

  const locate = useLocation();
  const ticket: Ticket = locate.state;

  //console.log(locate.state);

  const { user } = useContext(AuthContext);

  const [, setUserIsActive] = useState(false);
  const [openPopUp, setopenPopUp] = useState(false);

  const handleBack = () => {
    navigate('/ServProvDashboard')
  }

  const handleUserActive = () => {
    setUserIsActive(true);
  };
  const handleUserInactive = () => {
    setUserIsActive(false);
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
        navigate('/ServProvDashboard');
      });
  };

  const handleViewFeedback = (event: MouseEvent<HTMLButtonElement | HTMLDivElement>): void => {
    event.preventDefault();

    navigate('/ViewFeedback', { state: ticket });
  }
    // TODO: get contact details from assignedPerson

  useEffect(() => {
    if (openPopUp) {
      setTimeout(() => {
        closePopUp();
        navigate('/ServProvDashboard');
      }, 1000); // 1 second
    }
  }, [openPopUp]);


  return (
    <div className="flex flex-col h-screen bg-[#ECEDED]">
    <Navbar />
      <div className="flex flex-col font-3xl" id="viewTicket">
            <BackButton
              type="button"
              label={"all tickets"}
              handleClick={handleBack}/>
            <div className='flex justify-center'>
                <p className='text-headerText pb-5 text-2xl font-medium'>{ticket._id}</p>
            </div>
            <div className='flex flex-row justify-center'>
            <div className="flex w-fit bg-white border-gray-200 rounded-lg shadow sm:p-7">
                <form className="space-y-4">
                    <p className="text-lg text-left font-medium">{ticket.title}</p>
                    <hr className="h-[1px] bg-gray-300 border-0 drop-shadow-md"></hr>
                    <LineField
                      type={"text"}
                      label="Category"
                      padding_right="50"
                      value={ticket.requestType}
                      name="category"
                      placeholder={""}
                      error={""}
                      disabled={true}
                      layout=''
                      classnames='w-1/3'
                      onChange={()=> null}/>
                    <AreaField
                        label={"Description"}
                        classnames="w-4/5"
                        padding_right={"32"}
                        value={ticket.description}
                        id="description"
                        disabled={true}
                        layout=''
                        error={""}
                        placeholder="Please include any additional remarks here."
                        onChange={()=>null} />
                    <Gallery
                        label={"Attachments"}
                        values={ticket?.attachements}
                        padding_right={"0"}/>
                    <hr className="h-[2px] bg-gray-300 border-0 drop-shadow-md"></hr>
                    <div className="grid grid-cols-2 pt-1">
                      <Status
                        label={"Status"}
                        value={ticket.status}
                        padding_right={"0"}/>
                      <div className='flex flex-col pt-1'>
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
                      </div>
                    </div>
                </form>
            </div>
            <div className='ml-2 w-3/7 flex h-fit bg-white border-gray-200 rounded-lg shadow sm:p-7'>
              <div className='space-y-4'>
                <p className="text-lg text-left font-medium">Landlord Assigned</p>
                <hr className="h-[1px] bg-gray-300 border-0 drop-shadow-md"></hr>
                <LineField
                      type={"text"}
                      label="Name"
                      padding_right="65"
                      value={"Mr Smoy"}
                      name="landlord"
                      placeholder={""}
                      error={""}
                      disabled={true}
                      layout=''
                      classnames='w-3/5'
                      onChange={()=> null}/>
                <LineField
                      type={"text"}
                      label="Contact"
                      padding_right="50"
                      value={"+65 8766 3211"}
                      name="landlordCtc"
                      placeholder={""}
                      error={""}
                      disabled={true}
                      layout=''
                      classnames='w-3/5'
                      onChange={()=> null}/>
              </div>
            </div>
            </div>
      </div>
    </div>
    );
  }
  
  export default ViewTicket;