import React, { MouseEvent, ChangeEvent, FormEvent, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import LineField from '../components/LineField';
import LandlordNavbar from '../components/LandlordNavbar';
import BackButton from '../components/BackButton';
import SubmitButton from '../components/SubmitButton';

const AccountCreation = () => {
  const navigate = useNavigate();
  const locate = useLocation();
  const [firstView, setFirstView] = useState(true);
  const [isClosed, setClosed] = useState(false);

  const [isSubmit, setSubmit] = useState(false);
  const [filenames, setFilenames] = useState<string[]>([]);
  const [errors, setErrors] = useState<string | any>({});

  const [formState, setFormState] = useState<string | any>({
    formEmail: "",
    formBldgID: "",
  });

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

  const handleValueChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLDivElement>) : void => {
    if ('value' in event.target) {
      setFormState({
        ...formState,
        [event.target.name]: event.target.value
      });
    }
  };

  const handleBack = () => {
    navigate('/LandlordDashboard')
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!formState.formEmail) {
      errors.formEmail = "Enter a Email!";
    } else {
      delete errors.formEmail;
    }
    if (!formState.formBldgID) {
      errors.formBldgID = "Enter Building ID!";
    } else {
      delete errors.formBldgID;
    }
  

    setErrors({ ...errors });

    if (Object.keys(errors).length > 0) {
    } else {
      setSubmit(true);
      navigate('/LandlordDashboard');
    }

  };

  useEffect(() => {
    if (isSubmit) {
      setTimeout(() => {
        navigate('/', { state: { formState, isSubmit } });
      }, 5000);
    }
  }, [isSubmit, formState, navigate]);

  const {
    formEmail,
    formBldgID,
  } = formState;

  return (
    <>
    <div className="flex flex-col h-screen bg-[#ECEDED]">
    <LandlordNavbar />
    <BackButton
              type="button"
              label={"home"}
              handleClick={handleBack}/>
      <div className="flex flex-col items-center justify-center">
        <div className="flex flex-col text-left">
          <div className="flex flex-row justify-start">
            <p className="text-headerText text-[#2E424D] pb-5 text-2xl font-medium">Account Creation</p>
          </div>
          <div className="flex w-fit bg-white border-gray-200 rounded-lg shadow sm:p-5 items-center ">
            <form className="space-y-4 mx-auto w-fit bg-white">
              <p className="text-lg text-left font-medium">Service Provider Details</p>
              <hr className="h-[1px] bg-gray-300 border-0 drop-shadow-md"></hr>
              <LineField
                type={'text'}
                label="Email"
                padding_right="85"
                value={formEmail}
                name="formEmail"
                placeholder={'enter email'}
                error={errors.formEmail}
                disabled={false}
                layout=""
                classnames="w-3/5"
                onChange={handleValueChange}
              />
              <LineField
                type={'text'}
                label="Building ID"
                padding_right="45"
                value={formBldgID}
                name="formBldgID"
                placeholder={'enter building id'}
                error={errors.formBldgID}
                disabled={false}
                layout=""
                classnames="w-3/5"
                onChange={handleValueChange}
              />
              <div className='flex justify-end'>
              <SubmitButton type="submit" label={'Submit'} handleClick={handleSubmit} />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default AccountCreation;