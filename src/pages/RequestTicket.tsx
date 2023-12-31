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
import { client } from '../client';

function RequestTicket() {
  // Navigation & routing
  const navigate = useNavigate();

  // Context
  const { user } = useContext(AuthContext);

  // UseStates & Backend Data
  const [isSubmit, setSubmit] = useState(false);
  const [Id, setId] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [contact, setContact] = useState('');
  const [categories, setcategories] = useState<string[]>([]);
  const [filenames, setFilenames] = useState<string[]>([]);
  const [errors, setErrors] = useState<string | any>({});
  const [formState, setFormState] = useState({
    formTitle: '',
    formCategory: '',
    formDescription: '',
    formAttachments: [] as File[],
    formAcknowledgement: false,
    name: '',
    email: user?.email ?? '',
    number: '',
  });
  // Mock static values
  var area = 'General Queries';
  var contactNo = '+65 9123 4567';
  // var categories = ['Cleanliness', 'Aircon Extension', 'Repair', 'Pest Control'];

  const date = new Date();
  let currentDay = String(date.getDate()).padStart(2, '0');
  let currentMonth = String(date.getMonth() + 1).padStart(2, '0');
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
  const handleIdChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const newValue = event.target.value;
    setId(newValue);
  };
  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const newValue = event.target.value;
    setName(newValue);
  };
  const handleContactChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const newValue = event.target.value;
    setContact(newValue);
  };
  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const newValue = event.target.value;
    setEmail(newValue);
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
      const data: File[] = [];
      const names: string[] = [];
      if (!event.target.files || event.target.files.length === 0) {
        console.log('Select a file');
      } else {
        for (let i = 0; i < event.target.files.length; i++) {
          data.push(event.target.files[i]);
          names.push(event.target.files[i].name);
        }
        console.log(data);
        const updatedAttachments = formState['formAttachments'].concat(data);
        setFormState({
          ...formState,
          [event.target.name]: updatedAttachments,
        });
        setFilenames(names);
      }
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
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

    if (formDescription !== '') {
      setFormState({
        ...formState,
        formDescription: currentDate.concat(' : ', formDescription!),
      });
    }

    if (Object.keys(errors).length > 0) {
    } else {
      const form = new FormData();
      form.set('leaseId', user?.leaseId ?? '');
      form.set('title', formState.formTitle);
      form.set('description', formState.formDescription);
      form.set('requestType', formState.formCategory);
      form.set('contact[name]', formState.name);
      form.set('contact[email]', formState.email);
      form.set('contact[number]', formState.number);
      for (const attachement of formAttachments) {
        form.append('attachements', attachement);
      }
      client
        .service('ticket')
        .create(form as any, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then(() => {
          setSubmit(true);
        });
    }
  };

  useEffect(() => {
    if (isSubmit) {
      let redirect = '/tenantDashboard';
      navigate('/Success', { state: { redirect, formState, isSubmit } });
    }
  }, [isSubmit, formState, navigate]);

  useEffect(() => {
    let reqTypes = {};
    client
      .service('building')
      .get(user?.buildingId ?? '')
      .then((building) => {
        reqTypes = building.requestTypes;
        setcategories(building.requestTypes);
      });
  });

  const { formTitle, formCategory, formDescription, formAttachments, formAcknowledgement } =
    formState;

  return (
    <React.Fragment>
      {/* // When user is not logged in */}
      {user === null ? (
        <Navigate to="/" replace={true} />
      ) : (
        <React.Fragment>
          {/* // When user is logged in AND a tenant */}
          {user?.typ === 0 ? (
            <React.Fragment>
              <div className="flex flex-row">
                <BackButton
                  type="button"
                  label={'all tickets'}
                  handleClick={() => navigate('/tenantDashboard')}
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
                          label="Name"
                          classnames=""
                          padding_right="0"
                          value={formState.name}
                          name="name"
                          placeholder={''}
                          error=""
                          disabled={false}
                          layout={'vertical'}
                          onChange={handleValueChange}
                        />
                        <LineField
                          type={'text'}
                          label="Contact Number"
                          classnames="w-4/5"
                          padding_right="0"
                          value={formState.number}
                          name="number"
                          placeholder={''}
                          error=""
                          disabled={false}
                          layout={'vertical'}
                          onChange={handleValueChange}
                        />
                        <LineField
                          type={'text'}
                          label="Email"
                          classnames="w-4/5"
                          padding_right="0"
                          value={formState.email}
                          name="email"
                          placeholder={''}
                          error=""
                          disabled={false}
                          layout={'vertical'}
                          onChange={handleValueChange}
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
                        placeholder="Please include any additional remarks here."
                        onChange={handleTextChange}
                      />
                      <UploadField
                        label="Add Attachments"
                        layout=""
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
