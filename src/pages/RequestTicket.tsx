import AreaField from '../components/AreaField';
import LineField from '../components/LineField';
import DropdownField from '../components/DropdownField';
import UploadField from '../components/UploadField';
import TermsConditionsCheckbox from '../components/TermsConditionsCheckbox';
import SubmitButton from '../components/SubmitButton';

import React, { ChangeEvent, FormEvent, useEffect, useState, useContext } from 'react';

import { useNavigate, Navigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import BackButton from '../components/BackButton';

function RequestTicket() {
  // Navigation & routing
  const navigate = useNavigate();

  // Context
  const { user } = useContext(AuthContext);

  // UseStates & Backend Data
  const [isSubmit, setSubmit] = useState(false);
  const [filenames, setFilenames] = useState<string[]>([]);
  const [errors, setErrors] = useState<string | any>({});
  const [formState, setFormState] = useState<string | any>({
    formTitle: '',
    formID: 5, // For demo purposes, this is set
    formStatus: 'In Queue',
    formCategory: '',
    formDescription: '',
    formAttachments: [],
    formAcknowledgement: false,
  });
  // Mock static values
  var area = 'General Queries';
  var contactNo = '+65 9123 4567';
  var email = 'dianmaisara@gmail.com';
  var userCtc = '+65 9874 2311';
  var categories = ['Cleanliness', 'Aircon Extension', 'Repair', 'Pest Control'];

  const date = new Date();
  let currentDay= String(date.getDate()).padStart(2, '0');
  let currentMonth = String(date.getMonth()+1).padStart(2,"0");
  let currentYear = date.getFullYear() % 100;
  let currentDate = `${currentDay}/${currentMonth}/${currentYear}`;

  // Handlers
  const handleValueChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLDivElement>
  ): void => {
    if ('value' in event.target) {
      setFormState({
        ...formState,
        [event.target.name]: event.target.value,
      });
    }
  };

  const handleTextChange = (event: ChangeEvent<HTMLDivElement>): void => {
    if ('textContent' in event.target) {
      setFormState({
        ...formState,
        [event.target.id]: event.target.textContent,
      });
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

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!formState.formTitle) {
      errors.formTitle = 'Enter a title!';
    } else {
      delete errors.formTitle;
    }
    if (!formState.formAcknowledgement) {
      errors.formAcknowledgement = 'Please accept the T&C!';
    } else {
      delete errors.formAcknowledgement;
    }
    if (!formState.formCategory) {
      errors.formCategory = 'Enter a category!';
    } else {
      delete errors.formCategory;
    }
    setErrors({ ...errors });

    if (formDescription !== "") {
      setFormState({
        ...formState,
        formDescription: currentDate.concat(" : ",formDescription!),
      })
    };

    if (Object.keys(errors).length > 0) {
    } else {
      setSubmit(true);
    }
  };

  useEffect(() => {
    if (isSubmit) {
      let redirect = '/tenantDashboard';
      navigate('/Success', { state: { redirect, formState, isSubmit } });
    }
  }, [isSubmit, formState, navigate]);

  const { formTitle, formCategory, formDescription, formAttachments, formAcknowledgement } =
    formState;

  return (
    <React.Fragment>
      {/* // When user is not logged in */}
      {user === null ? (
        <Navigate to="/401" replace={true} />
      ) : (
        <React.Fragment>
          {/* // When user is logged in AND a tenant */}
          {user?.typ === 0 ? (
            <React.Fragment>
              {/* FOR REFERENCE IF WANT TO TROUBLESHOOT ATTACHMENTS
              {isSubmit ? (
                <div className="h-full w-full flex flex-col items-center justify-center">
                  <p>"{formTitle}" Ticket has been sent!</p>
                  <p>Category: {formCategory}</p>
                  <p>User acceptance: {formAcknowledgement ? 'yes' : ''}</p>
                  {formDescription ? <p>Description: {formDescription}</p> : null}
                  {formAttachments.length > 0 ? <p>Attachments below:</p> : null}
                  {formAttachments?.map((file: string) => {
                    return (
                      <iframe
                        src={file}
                        title="Attachments"
                        className="flex align-center items-center mx-auto wx-full text-center"
                      />
                    );
                  })}
                </div>
              ) : ( */}
                <div className='flex flex-row'>
                  <BackButton
                    type="button"
                    label={'all tickets'}
                    handleClick={() =>
                    navigate('/tenantDashboard')
                    }
                  />
                <div className="flex flex-col w-4/5 items-center" id="requestTicket">
                  <div className="flex bg-content px-10 my-3">
                    <p className="text-sm flex flex-col text-black font-base py-1">
                      <span>
                        For {area}, please refer to the Frequently Asked Questions FAQ Page{' '}
                        <a href="/#" className="underline">
                          here{' '}
                        </a>
                      </span>
                      <span>In case of emergencies, please contact us at {contactNo}</span>
                    </p>
                  </div>
                  <div className="flex bg-form border-gray-700 rounded-lg shadow sm:p-5">
                    <form onSubmit={handleSubmit} className="space-y-5">
                      <p className="text-lg text-center font-medium h-5">New Request Form</p>
                      <hr className="h-[1px] bg-gray-300 border-0 drop-shadow-md"></hr>
                      <div className="grid grid-cols-2 gap-x-10">
                        <LineField
                          type={'text'}
                          label="Email"
                          classnames=""
                          padding_right="0"
                          value={email}
                          name="name"
                          placeholder={''}
                          error=""
                          disabled={true}
                          layout={'vertical'}
                          onChange={() => null}
                        />
                        <LineField
                          type={'text'}
                          label="Contact"
                          classnames="w-4/5"
                          padding_right="0"
                          value={userCtc}
                          name="userCtc"
                          placeholder={''}
                          error=""
                          disabled={true}
                          layout={'vertical'}
                          onChange={() => null}
                        />
                      </div>
                      <LineField
                        type={'text'}
                        label="Title"
                        classnames="w-3/4"
                        padding_right="0"
                        value={formTitle}
                        name="formTitle"
                        placeholder={'Please type in a title'}
                        error={errors.formTitle}
                        disabled={false}
                        layout={'vertical'}
                        onChange={handleValueChange}
                      />
                      <DropdownField
                        type={'text'}
                        label="Category"
                        classnames="w-1/4"
                        padding_right="0"
                        value={formCategory}
                        name="formCategory"
                        error={errors.formCategory}
                        disabled={false}
                        layout={'vertical'}
                        options={categories}
                        onChange={handleValueChange}
                      />
                      <AreaField
                        label={'Description'}
                        classnames=""
                        padding_right={'0'}
                        value={formDescription}
                        id="formDescription"
                        disabled={false}
                        layout={'vertical'}
                        error={''}
                        placeholder="Please inclue any additional remarks here."
                        onChange={handleTextChange}
                      />
                      <UploadField
                        label="Add Attachments"
                        name="formAttachments"
                        padding_right="0"
                        filenames={filenames}
                        value={formAttachments}
                        error={errors.formAttachments}
                        disabled={false}
                        onChange={handleFileChange}
                      />
                      <TermsConditionsCheckbox
                        link={'#'}
                        label="Acnowledgement of T&C"
                        padding_right="0"
                        value={formAcknowledgement}
                        name="formAcknowledgement"
                        error={errors.formAcknowledgement}
                        disabled={false}
                        onChange={handleCheckedChange}
                      />
                      <SubmitButton type="button" label="Submit" handleClick={handleSubmit} />
                    </form>
                  </div>
                </div>
                </div>
              {/* )} */}
            </React.Fragment>
          ) : (
            // When user is logged in but NOT a tenant
            <Navigate to="/403" replace={true} />
          )}
        </React.Fragment>
      )}
    </React.Fragment>
  );
}
export default RequestTicket;
