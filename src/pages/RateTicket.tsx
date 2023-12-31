import BackButton from '../components/BackButton';
import ActionButton from '../components/ActionButton';
import StarRating from '../components/StarRating';
import AreaField from '../components/AreaField';
import TermsConditionsCheckbox from '../components/TermsConditionsCheckbox';
import SubmitButton from '../components/SubmitButton';
import UploadField from '../components/UploadField';
import { Ticket } from '../esc-backend/src/client';
import { client } from '../client';

import React, { MouseEvent, ChangeEvent, FormEvent, useState, useEffect, useContext } from 'react';

import { useNavigate, useLocation, Navigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

function RateTicket() {
  // Navigation & routing
  const navigate = useNavigate();
  const locate = useLocation();
  // var form = locate.state ? locate.state.formState : null; // Temporary -> for demo purposes w/o backend
  // var title = form ? form.formTitle : ''; // Temporary -> for demo purposes w/o backend
  // var category = form ? form.formCategory : ''; // Temporary -> for demo purposes w/o backend
  // var ticket_ID = form ? form.formID : ''; // Temporary -> for demo purposes w/o backend
  // var status = form ? form.formStatus : ''; // // Temporary -> for demo purposes w/o backend
  // var description = form ? form.formDescription : ''; // // Temporary -> for demo purposes w/o backend

  const ticket: Ticket = locate.state;

  const date = new Date();
  let currentDay = String(date.getDate()).padStart(2, '0');
  let currentMonth = String(date.getMonth() + 1).padStart(2, '0');
  let currentYear = date.getFullYear() % 100;
  let currentDate = `${currentDay}/${currentMonth}/${currentYear}`;

  // Context
  //const { user } = useContext(AuthContext);

  // UseStates & Backend Data
  const [firstView, setFirstView] = useState(true);
  const [isClosed, setClosed] = useState(false);
  const [formState, setFormState] = useState<string | any>({
    formTitle: ticket?.title,
    formCategory: ticket?.requestType,
    formID: ticket?._id,
    formStatus: ticket,
    formFeedback: {
      rating: ticket?.feedback?.rating ?? 0,
      description: ticket?.feedback?.description ?? '',
    },
    formAcknowledgement: false,
    formAttachments: [],
  });
  const [isSubmit, setSubmit] = useState(false);
  const [filenames, setFilenames] = useState<string[]>([]);
  const [errors, setErrors] = useState<string | any>({});

  // Handlers
  const handleButtonClick = (event: MouseEvent<HTMLButtonElement>): void => {
    event.stopPropagation();
    setFirstView(false);
    if ('name' in event.target) {
      let closed = false;
      if (event.target.name === 'accept') {
        closed = true;
      }
      setClosed(closed);
    }
  };

  const handleCheckedChange = (event: ChangeEvent<HTMLInputElement>): void => {
    if ('checked' in event.target) {
      setFormState({
        ...formState,
        [event.target.name]: event.target.checked,
      });
    }
  };

  const handleRatingChange = (rating: number) => {
    // Create a new object with the updated rating value in formFeedback
    const updatedFormFeedback = { ...formState.formFeedback, rating };

    // Update the formState with the new formFeedback
    setFormState({
      ...formState,
      formFeedback: updatedFormFeedback,
    });
  };

  const handleTextChange = (event: ChangeEvent<HTMLDivElement>): void => {
    event.stopPropagation();
    const target = event.target;
    if ('id' in target) {
      setFormState({
        ...formState,
        formFeedback: {
          ...formState.formFeedback,
          description: target.textContent,
        },
      });
    }
    console.log('formState: ', formState.formFeedback);
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>): void => {
    if ('files' in event.target) {
      const data: string[] = [];
      const names: string[] = [];
      if (!event.target.files || event.target.files.length === 0) {
        console.log('Select a file');
      } else {
        for (let i = 0; i < event.target.files.length; i++) {
          data.push(URL.createObjectURL(event.target.files[i]));
          names.push(event.target.files[i].name);
        }
        const updatedAttachments = formState['formAttachments'].concat(data);
        setFormState({
          ...formState,
          [event.target.name]: updatedAttachments,
        });
        setFilenames(names);
      }
    }
  };

  const updateRatingAndDescription = async () => {
    console.log('updateRatingAndDescription: ', formState.formFeedback.rating, formState.formFeedback.description);
    await client.service('ticket').rateTicket({
      ticketId: ticket._id,
      feedback: formState.formFeedback,
    });
  };

  const updateReOpenTicket = async () => {
    console.log('updateReOpenTicket: ', formState.formDescription);
    await client.service('ticket').reopenTicket({
      ticketId: ticket._id,
      // TODO : description: formState.formDescription,
      // TODO : add attachments
    });
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isClosed) {
      if (!formState.formFeedback.rating) {
        errors.formFeedback.rating = 'Enter a rating!';
      } else {
        delete errors.formFeedback.rating;
      }
    } else {
      if (!formState.formDescription) {
        errors.formRemarks = 'Please list your concerns above.';
      } else {
        delete errors.formRemarks;
      }
    }
    if (!formState.formAcknowledgement) {
      errors.formAcknowledgement = 'Please accept the T&C!';
    } else {
      delete errors.formAcknowledgement;
    }
    setErrors({ ...errors });
    console.log('formState: ', formState.formFeedback);

    if (errors.formFeedback.rating == 'Enter a rating!' || errors.formAcknowledgement == 'Please accept the T&C!' ) {
    } 
    else 
    {
      if (isClosed) {
        setFormState({
          ...formState,
          formStatus: 'Closed',
          formDescription: ticket.description.concat('\n', currentDate, ' : ', formDescription!),
        });
        updateRatingAndDescription();
      } else {
        setFormState({
          ...formState,
          formStatus: 'In Queue',
          formDescription: ticket.description.concat('\n', currentDate, ' : ', formDescription!),
        });
        updateReOpenTicket();
      }
      setSubmit(true);
    }
  };

  

  useEffect(() => {
    console.log('useEffect: ', formState.formFeedback.rating);
    console.log('useEffect: ', formState.formFeedback.description);
    if (isSubmit) {
      let redirect = '/tenantDashboard';
      navigate('/Success', { state: { redirect, formState, isSubmit, isClosed } });
    }
  }, [isSubmit, formState, isClosed, navigate]);

  useEffect(() => {
    
    setErrors({ formFeedback: { rating: '' }, formRemarks: '', formAcknowledgement: '' });

  }, []);

  const { formFeedback, formDescription, formAcknowledgement, formAttachments } = formState;

  return (
    // <React.Fragment>
    //   {/* // When user is not logged in */}
    //   {user === null ? (
    //     <Navigate to="/401" replace={true} />
    //   ) : (
        <React.Fragment>
          {/* // When user is logged in AND a tenant */}
          {/* {user?.typ === 0 && formState ? ( */}
            <React.Fragment>
              <div className="flex flex-col font-3xl" id="viewTicket">
                <BackButton
                  type="button"
                  label={'ticket details'}
                  handleClick={() =>
                    navigate('/viewDetails', { state: { formState, isSubmit: true } })
                  }
                />
                <div className="flex justify-center">
                  <p className="text-headerText pb-5 text-2xl font-medium">
                    Service Ticket #00{ticket?._id} : {ticket?.buildingId} Unit {ticket?.leaseId}
                  </p>
                </div>
                <div className="flex mx-auto w-fit bg-form border-gray-200 rounded-lg shadow sm:p-7">
                  <form className="space-y-4" onSubmit={handleSubmit}>
                    <p className="text-lg text-left font-medium">{ticket?.title}</p>
                    <hr className="h-[1px] bg-gray-300 border-0 drop-shadow-md"></hr>
                    <div className="flex align-center text-left">
                      <p className="text-userNameText">
                        Do you wish to close the ticket and confirm completion of service?
                      </p>
                    </div>
                    <div className="flex flex-row gap-x-5">
                      <ActionButton
                        value={'Yes'}
                        padding_right={'0'}
                        type="accept"
                        toggle={isClosed}
                        firstViewState={firstView}
                        onClick={handleButtonClick}
                      />
                      <ActionButton
                        value={'No'}
                        padding_right={'0'}
                        type="reject"
                        toggle={!isClosed}
                        firstViewState={firstView}
                        onClick={handleButtonClick}
                      />
                    </div>
                    {firstView ? null : isClosed ? (
                      <React.Fragment>
                        <StarRating
                          label={'Rating'}
                          padding_right="24"
                          rating={formFeedback.rating}
                          disabled={false}
                          error={errors.formFeedback.rating}
                          handleClick={handleRatingChange}
                        />
                        <AreaField
                          label={'Additional Remarks'}
                          classnames="w-4/5"
                          padding_right={'0'}
                          value={formFeedback.description}
                          id="formDescription"
                          disabled={false}
                          layout={'vertical'}
                          error={''}
                          placeholder="Please include any additional remarks here."
                          onChange={handleTextChange}
                        />
                        <TermsConditionsCheckbox
                          link={'#'}
                          label="Acknowledgement of T&C"
                          padding_right="0"
                          value={formAcknowledgement}
                          name="formAcknowledgement"
                          error={errors.formAcknowledgement}
                          disabled={false}
                          onChange={handleCheckedChange}
                        />
                        <SubmitButton type="submit" label="Submit" handleClick={handleSubmit} />
                      </React.Fragment>
                    ) : (
                      <React.Fragment>
                        <AreaField
                          label={'Reasons for reopening of service ticket'}
                          classnames=""
                          padding_right={'0'}
                          value={formDescription}
                          id="formDescription"
                          disabled={false}
                          layout={'vertical'}
                          error={errors.formDescription}
                          placeholder="Please include any additional remarks here."
                          onChange={handleTextChange}
                        />
                        <UploadField
                          label="Add Attachments"
                          name="formAttachments"
                          padding_right="0"
                          filenames={filenames}
                          value={formAttachments}
                          error={''}
                          disabled={false}
                          onChange={handleFileChange}
                          layout={''}
                        />
                        <TermsConditionsCheckbox
                          link={'#'}
                          label="Acknowledgement of T&C"
                          padding_right="0"
                          value={formAcknowledgement}
                          name="formAcknowledgement"
                          error={errors.formAcknowledgement}
                          disabled={false}
                          onChange={handleCheckedChange}
                        />
                        <SubmitButton type="submit" label="Submit" handleClick={handleSubmit} />
                      </React.Fragment>
                    )}
                  </form>
                </div>
              </div>
              {/* )} */}
            </React.Fragment>
          {/* ) : (
            // When user is logged in but NOT a tenant
            <Navigate to="/403" replace={true} />
          )} */}
        </React.Fragment>)
  //     )}
  //   </React.Fragment>
  // );
}
export default RateTicket;
