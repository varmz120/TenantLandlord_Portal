import { ChangeEvent, FormEvent, useState, useEffect, MouseEvent, SetStateAction } from 'react';
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
import UploadField from '../components/UploadField';

import { client } from '../client';

const AddLease = () => {
  const navigate = useNavigate();

  const [isSubmit, setSubmit] = useState(false);
  const [errors, setErrors] = useState<string | any>({});

  // UseStates & Backend Data - Temporarily None -> for demo purposes w/o backend
  const [formState, setFormState] = useState<string | any>({
    formUserID: '',
    formTenantID: '',
    formEmail: '',
    formUnit: '',
    formLeaseID: '',
    formBuildingID: '',
    formMonthlyRent: '',
    formCommencement: '',
    formExpiry: '',
    formAttachments: []
  });
  
  const [filenames, setFilenames] = useState<string[]>([]);
  const [isTenantPopupVisible, setTenantPopupVisible] = useState(false);
  const [isBldgPopupVisible, setBldgPopupVisible] = useState(false);
  const [tenantData, setTenantData] = useState([{ value: '', label: '' }]);
  const [buildingData, setBuildingData] = useState([{ value: '', label: '' }]);  

  const handleTenantDeleteClick = () => {
    setTenantPopupVisible(false);
  };

  const handleBldgDeleteClick = () => {
    setBldgPopupVisible(false);
  };

  const handleBack = () => {
    navigate('/LandlordDashboard');
  };

  const handleAddBuilding = (
    event: MouseEvent<HTMLButtonElement>
  ): void => {
    event.preventDefault();

    setBldgPopupVisible(!isBldgPopupVisible);
  };

  const handleAddTenant = (
    event: MouseEvent<HTMLButtonElement>
  ): void => {
    event.preventDefault();

    setTenantPopupVisible(!isTenantPopupVisible);
  };

  const handleValueChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLDivElement> | MouseEvent<HTMLInputElement>
  ): void => {
    if ('value' in event.target) {
      setFormState({
        ...formState,
        [event.target.name] : event.target.value,
      });
      console.log(event.target.value);
    }
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>): void => {
    if ('files' in event.target) {
      var data: File;
      var name: string = "";
      if (!event.target.files || event.target.files.length === 0) {
        console.log('Select a file');
      } else {
        data = event.target.files[0];
        name = event.target.files[0].name;
        setFormState({
          ...formState,
          [event.target.name]: data,
        });
        setFilenames([name]);
      }
    }
  };

  const getTenantData = async () => {
    try {
      const tenantData = await client.service('tenants').find({ query: {$select: ['_id'] }});
      const tenants = tenantData.data;
      const tenantsUpdated = tenants.map((tenant) => ({
        value: tenant._id,
        label: tenant._id
      }));
      return tenantsUpdated;
    } catch (error) {
      console.error('Error fetching tenants:', error);
      return null;
    }
  }

  const fetchTenantData = async () => {
    try {
      const tenantData = await getTenantData();

      if (tenantData !== null) {
        setTenantData(tenantData);
      } else {
        // Handle the case when adminData is null (error occurred)
        // You can set it to an empty array or handle it based on your use case.
        setTenantData([]);
      }
    } catch (error) {
      console.error('Error fetching tenants:', error);
      // Handle the error case
      setTenantData([]);
    }
  };

  const getBuildingData = async () => {
    try {
      const buildingData = await client.service('building').find({ query: {$select: ['_id'] }});
      const buildings = buildingData.data;
      const buildingsUpdated = buildings.map((building) => ({
        value: building._id,
        label: building._id
      }));
      return buildingsUpdated;
    } catch (error) {
      console.error('Error fetching buildings:', error);
      return null;
    }
  }

  const fetchBuildingData = async () => {
    try {
      const buildingData = await getBuildingData();

      if (buildingData !== null) {
        setBuildingData(buildingData);
      } else {
        // Handle the case when adminData is null (error occurred)
        // You can set it to an empty array or handle it based on your use case.
        setBuildingData([]);
      }
    } catch (error) {
      console.error('Error fetching buildings:', error);
      // Handle the error case
      setBuildingData([]);
    }
  };

  const handleBuilding = async () => {
    fetchBuildingData();
    console.log(buildingData);
  }

  const handleTenant = async () => {
    fetchTenantData();
    console.log(tenantData);
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!formState.formUserID) {
      errors.formUserID = 'Enter a user ID!';
    } else {
      delete errors.formUserID;
    }
    if (!formState.formEmail) {
      errors.formEmail = 'Enter Email Address!';
    } else {
      delete errors.formEmail;
    }
    if (!formState.formTenantID) {
      errors.formTenant = 'Enter Tenant!';
    } else {
      delete errors.formTenantID;
    }
    if (!formState.formUnit) {
      errors.formUnit = 'Enter Unit Address!';
    } else {
      delete errors.formUnit;
    }
    if (!formState.formBuildingID) {
      errors.formBldgID = 'Enter Building ID!';
    } else {
      delete errors.formBldgID;
    }
    if (!formState.formMonthlyRent) {
      errors.formMonthlyRent = 'Enter Monthly Rent!';
    } else {
      delete errors.formMonthlyRent;
    }
    if (!formState.formCommencement) {
      errors.formLeaseCommencement = 'Enter Lease Commencement Date!';
    } else {
      delete errors.formLeaseCommencement;
    }
    if (!formState.formExpiry) {
      errors.formLeaseExpiry = 'Enter Lease Expiry Date!';
    } else {
      delete errors.formLeaseExpiry;
    }
    if (!formState.formAttachments) {
      errors.formAttachments = 'Enter Lease Expiry Date!';
    } else {
      delete errors.formAttachments;
    }

    setErrors({ ...errors });

    console.log(errors);

    if (Object.keys(errors).length > 0) {
    } else {
      const leaseForm = new FormData();
      
      leaseForm.set('_id', formLeaseID); // Change this
      leaseForm.set('userId', formUserID);
      leaseForm.set('tenantId', formTenantID); // formTenantID
      leaseForm.set('units[0][number]', formUnit);
      leaseForm.set('units[0][buildingId]', formBuildingID); // Change component tied to this
      leaseForm.set('units[0][leaseId]', formLeaseID);
      leaseForm.set('commencementDate', formCommencement);
      leaseForm.set('expiryDate', formExpiry);
      leaseForm.set('monthlyRent', formMonthlyRent);
      leaseForm.set('leaseFile', formAttachments);

      console.log(formState);

      await client.service('lease').create(leaseForm as any, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setSubmit(true);
    }
  };

  useEffect(() => {
    if (isSubmit) {
      setTimeout(() => {
        navigate('/LandlordDashboard', { state: { isSubmit } });
      }, 2000);
    }
  }, [isSubmit, navigate]);

const { formUserID, formEmail, formUnit, formMonthlyRent, formCommencement, formExpiry, formTenantID, formBuildingID, formLeaseID, formAttachments } = formState;

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
                  padding_right="99"
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
                  <SearchTenantField 
                    type={'text'} 
                    layout={''} 
                    error={errors.formTenant}
                    data={tenantData}
                    onClick={handleTenant}
                    onBlur={handleValueChange}
                  />
                  <div>
                    <AddTenantButton
                      type="button"
                      label={'+ Create New Tenant'}
                      handleClick={handleAddTenant}
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
                  <SearchBldgField 
                    type={'text'} 
                    layout={''} 
                    error={errors.formBldgID}
                    data={buildingData}
                    onClick={handleBuilding}
                    onBlur={handleValueChange} />
                  <div>
                    <AddBldgButton
                      type="button"
                      label={'+ Add Building'}
                      handleClick={handleAddBuilding}
                    ></AddBldgButton>
                  </div>
                </div>

                <LineField
                  type={'text'}
                  label="Monthly Rent"
                  padding_right="39"
                  value={formMonthlyRent}
                  name="formMonthlyRent"
                  placeholder={'monthly rent'}
                  error={errors.formMonthlyRent}
                  disabled={false}
                  layout=""
                  classnames=""
                  onChange={handleValueChange}
                />

                <UploadField
                  label="Add Lease"
                  name="formAttachments"
                  layout=""
                  padding_right="62"
                  filenames={filenames}
                  value={formAttachments}
                  error={errors.formAttachments}
                  disabled={false}
                  onChange={handleFileChange}
                />

                <LineField
                  type={'text'}
                  label="Lease ID"
                  padding_right="75"
                  value={formLeaseID}
                  name="formLeaseID"
                  placeholder={'lease id'}
                  error={''}
                  disabled={false}
                  layout=""
                  classnames=""
                  onChange={handleValueChange}
                />

                <hr className="h-[1px] bg-gray-300 border-0 drop-shadow-md"></hr>

                <div className='flex flex-row'>
                <CommencementExpiry
                  label1="Commencement"
                  padding_right="45"
                  value={formCommencement}
                  name="formCommencement"
                  placeholder={''}
                  error={''}
                  layout={''}
                  classnames={''}
                  onChange={handleValueChange}
                />
                <CommencementExpiry
                  label1="Expiry"
                  padding_right="45"
                  value={formExpiry}
                  name="formExpiry"
                  placeholder={''}
                  error={''}
                  layout={''}
                  classnames={''}
                  onChange={handleValueChange}
                />
                </div>
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
        {isTenantPopupVisible && <TenantDetails handleDelete={handleTenantDeleteClick}  />}
      </div>
      <div className="absolute top-4 right-64">
        {isBldgPopupVisible && <BuildingDetailsForm handleDelete={handleBldgDeleteClick}  />}
      </div>
    </>
  );
};

export default AddLease;
