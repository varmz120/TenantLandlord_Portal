import React, { ChangeEvent, FormEvent, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LineField from '../components/LineField';
import LandlordNavbar from '../components/LandlordNavbar';
import BackButton from '../components/BackButton';
import SearchBldgField from '../components/SearchBldgField';
import SearchTenantField from '../components/SearchTenantField';
import CommencementExpiry from '../components/CommencementExpiry';
import AddTenantButton from '../components/AddTenantButton';
import AddBldgButton from '../components/AddBldgButton';
import SubmitButton from '../components/SubmitButton';
import TenantDetails from '../components/TenantDetails';
import BuildingDetailsForm from '../components/BuildingDetailsForm';

const AddLease = () => {
  const navigate = useNavigate();

  const [isSubmit, setSubmit] = useState(false);
  const [errors, setErrors] = useState<string | any>({});

  const [formState, setFormState] = useState<string | any>({
    formUserID: '',
    formEmail: '',
    formTenant: '',
    formUnit: '',
    formBldgID: '',
    formMonthlyRent: '',
    formLeaseCommencement: '',
    formLeaseExpiry: '',
    //isSubmitted: false
  });

  const [isTenantPopupVisible, setTenantPopupVisible] = useState(false);
  const [isBldgPopupVisible, setBldgPopupVisible] = useState(false);

  const handleTenantDeleteClick = () => {
    setTenantPopupVisible(false);
  };

  const handleBldgDeleteClick = () => {
    setBldgPopupVisible(false);
  };

  const handleBack = () => {
    navigate('/LandlordDashboard');
  };

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

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!formState.formUserID) {
      errors.formUserID = 'Enter a Amount!';
    } else {
      delete errors.formUserID;
    }
    if (!formState.formEmail) {
      errors.formEmail = 'Enter Email Address!';
    } else {
      delete errors.formEmail;
    }
    if (!formState.formTenant) {
      errors.formTenant = 'Enter Tenant!';
    } else {
      delete errors.formTenant;
    }
    if (!formState.formUnit) {
      errors.formUnit = 'Enter Unit Address!';
    } else {
      delete errors.formUnit;
    }
    if (!formState.formBldgID) {
      errors.formBldgID = 'Enter Building ID!';
    } else {
      delete errors.formBldgID;
    }
    if (!formState.formMonthlyRent) {
      errors.formMonthlyRent = 'Enter Monthly Rent!';
    } else {
      delete errors.formMonthlyRent;
    }
    if (!formState.formLeaseCommencement) {
      errors.formLeaseCommencement = 'Enter Lease Commencement Date!';
    } else {
      delete errors.formLeaseCommencement;
    }
    if (!formState.formLeaseExpiry) {
      errors.formLeaseExpiry = 'Enter Lease Expiry Date!';
    } else {
      delete errors.formLeaseExpiry;
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
        navigate('/LandlordDashboard', { state: { formState, isSubmit } });
      }, 5000);
    }
  }, [isSubmit, formState, navigate]);

  const { formUserID, formEmail, formUnit, formMonthlyRent } = formState;

  return (
    <>
      <div className="flex flex-col h-screen bg-[#ECEDED]">
        <LandlordNavbar />
        <BackButton type="button" label={'home'} handleClick={handleBack} />
        <div className="flex flex-col items-center justify-center h-screen ">
          <div className="flex flex-col text-left">
            <div className="flex flex-row justify-start">
              <p className="text-headerText text-[#2E424D] pb-5 text-2xl font-medium">Add Lease</p>
            </div>
            <div className="flex w-fit bg-white border-gray-200 rounded-lg shadow sm:p-5 items-center ">
              <form className="space-y-4 mx-auto bg-white">
                <p className="text-lg text-left font-medium">Lease Details</p>
                <hr className="h-[1px] bg-gray-300 border-0 drop-shadow-md"></hr>
                <LineField
                  type={'text'}
                  label="User ID"
                  padding_right="85"
                  value={formUserID}
                  name="formUserID"
                  placeholder={'user id'}
                  error={errors.formUserID}
                  disabled={false}
                  layout=""
                  classnames=""
                  onChange={handleValueChange}
                />
                <LineField
                  type={'text'}
                  label="Email"
                  padding_right="100"
                  value={formEmail}
                  name="formEmail"
                  placeholder={'email address'}
                  error={errors.formEmail}
                  disabled={false}
                  layout=""
                  classnames=""
                  onChange={handleValueChange}
                />

                <div className="flex flex-center">
                  <SearchTenantField type={'text'} layout={''} error={errors.formTenant} />
                  <div>
                    <AddTenantButton
                      type="submit"
                      label={'+ Create New Tenant'}
                      handleClick={(event: { preventDefault: () => void; }) => { 
                        event.preventDefault();
                        setTenantPopupVisible(true)}}
                    ></AddTenantButton>
                  </div>
                </div>

                <LineField
                  type={'text'}
                  label="Unit(s)"
                  padding_right="90"
                  value={formUnit}
                  name="formUnit"
                  placeholder={'unit address'}
                  error={errors.formUnit}
                  disabled={false}
                  layout=""
                  classnames=""
                  onChange={handleValueChange}
                />

                <div className="flex flex-center">
                  <SearchBldgField type={'text'} layout={''} error={errors.formBldgID} />
                  <div>
                    <AddBldgButton
                      type="submit"
                      label={'+ Add Building'}
                      handleClick={(event: { preventDefault: () => void; }) => {
                        event.preventDefault();
                        setBldgPopupVisible(true)}}
                    ></AddBldgButton>
                  </div>
                </div>

                <LineField
                  type={'text'}
                  label="Monthly Rent"
                  padding_right="45"
                  value={formMonthlyRent}
                  name="formMonthlyRent"
                  placeholder={'monthly rent'}
                  error={errors.formMonthlyRent}
                  disabled={false}
                  layout=""
                  classnames=""
                  onChange={handleValueChange}
                />

                <hr className="h-[1px] bg-gray-300 border-0 drop-shadow-md"></hr>
                <CommencementExpiry
                  type={'text'}
                  label1="Commencement"
                  label2="Expiry"
                  padding_right="45"
                  value="06/06/2023"
                  name="commencement"
                  placeholder={''}
                  error={''}
                  layout={''}
                  classnames={''}
                  onChange={() => null}
                />
                <SubmitButton
                  type="submit"
                  label={'Submit'}
                  handleClick={handleSubmit}
                ></SubmitButton>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute top-4 right-64">
        {isTenantPopupVisible && <TenantDetails handleDelClick={handleTenantDeleteClick} />}
      </div>
      <div className="absolute top-4 right-64">
        {isBldgPopupVisible && <BuildingDetailsForm handleDelClick={handleBldgDeleteClick} />}
      </div>
    </>
  );
};

export default AddLease;
