import React, { FormEvent, useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import LineField from '../components/LineField';
import LandlordNavbar from '../components/LandlordNavbar';
import BackButton from '../components/BackButton';
import SubmitButton from '../components/SubmitButton';
import { client } from '../client';
import BackArrowIcon from '../images/back_arrow_icon.svg';
import CreateAccountForm from '../components/CreateAccountForm';
import AdminAccounts from '../components/tables/AdminAccounts';
import LandlordAccounts from '../components/tables/LandlordAccounts';
import ServiceProvidersAccounts from '../components/tables/ServiceProvidersAccounts';
import TenantAccounts from '../components/tables/TenantAccounts';

const AccountCreation = () => {
  const navigate = useNavigate();

  const [userId] = useState('');
  const [initialRender, setInitialRender] = useState(true);
  const [filterButtonActive, setFilterButtonActive] = useState('');
  const [email, setEmail] = useState('');
  const [isClicked, setClicked] = useState(false);
  const [buildingID, setBuildingID] = useState('');
  const [emailError, setEmailError] = useState('');
  const [buildingIDError, setBuildingIDError] = useState('');
  const [tenantData, setTenantData] = useState([{ ID: '', Email: '', LeaseID: '' }]);
  const [serviceProviderData, setServiceProviderData] = useState([
    { ID: '', Email: '', BuildingID: '' },
  ]);

  const handleAccountCreate = async () => {
    try {
      await client.service('users').create({
        _id: userId,
        typ: 1,
        email: email,
        buildingId: buildingID,
      });
    } catch (error) {
      console.error('Failed to create account', error);
    }
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const newValue = event.target.value;
    setEmail(newValue);

    // Validate the email format
    // const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    // setEmailError(emailRegex.test(newValue) ? '' : 'Invalid email format');
  };

  const handleBuildingChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const newValue = event.target.value;
    setBuildingID(newValue);
    setBuildingIDError(newValue.trim() ? '' : 'Building ID is required');
  };

  const handleBack = () => {
    navigate('/LandlordDashboard');
  };
  const getLandlordData = async () => {
    try {
      const landlordData = await client.service('users').find({ query: { typ: 2 } });
      const landlordUsers = landlordData.data;
      const landlordUsersUpdated = landlordUsers.map((user) => ({
        ID: user._id,
        Email: user.email,
        BuildingID: user.buildingId || '',
      }));
      // console.log(adminUsersUpdated);
      return landlordUsersUpdated;
    } catch (error) {
      console.error('Error fetching landlord users:', error);
      return null;
    }
  };
  const getTenantData = async () => {
    try {
      const tenantData = await client.service('users').find({ query: { typ: 0 } });
      const tenantUsers = tenantData.data;
      const tenantUsersUpdated = tenantUsers.map((user) => ({
        ID: user._id,
        Email: user.email,
        LeaseID: user.leaseId || '',
      }));
      // console.log(adminUsersUpdated);
      return tenantUsersUpdated;
    } catch (error) {
      console.error('Error fetching admin users:', error);
      return null;
    }
  };
  const fetchTenantData = async () => {
    try {
      const tenantData = await getTenantData();

      // console.log(tenantData);

      if (tenantData !== null) {
        setTenantData(tenantData);
      } else {
        // Handle the case when adminData is null (error occurred)
        // You can set it to an empty array or handle it based on your use case.
        setTenantData([]);
      }
    } catch (error) {
      console.error('Error fetching tenant users:', error);
      // Handle the error case
      setTenantData([]);
    }
  };

  const getServiceProviderData = async () => {
    try {
      const serviceProviderData = await client.service('users').find({ query: { typ: 1 } });
      const serviceProviderUsers = serviceProviderData.data;
      const serviceProviderUsersUpdated = serviceProviderUsers.map((user) => ({
        ID: user._id,
        Email: user.email,
        BuildingID: user.buildingId || '',
      }));

      return serviceProviderUsersUpdated;
    } catch (error) {
      console.error('Error fetching landlord users:', error);
      return null;
    }
  };
  const fetchServiceProviderData = async () => {
    try {
      const serviceProviderData = await getServiceProviderData();

      // console.log(serviceProviderData);

      if (serviceProviderData !== null) {
        setServiceProviderData(serviceProviderData);
      } else {
        // Handle the case when adminData is null (error occurred)
        // You can set it to an empty array or handle it based on your use case.
        setServiceProviderData([]);
      }
    } catch (error) {
      console.error('Error fetching tenant users:', error);
      // Handle the error case
      setServiceProviderData([]);
    }
  };
  const handleToggle = useCallback(
    (buttonId: string) => {
      setFilterButtonActive(buttonId === filterButtonActive ? '' : buttonId);
    },
    [filterButtonActive]
  );
  const [userType, setUserType] = useState<
    'Admins' | 'Landlords' | 'Tenants' | 'Service Providers'
  >('Tenants');
  const handleTenantsClick = () => {
    // console.log('Tenants button clicked.');
    // Perform actions specific to tenants button
    setUserType('Tenants');
  };

  const handleServiceProvidersClick = () => {
    // console.log('Service Providers button clicked.');
    // Perform actions specific to service providers button
    setUserType('Service Providers');
  };

  const handleClick = useCallback((buttonId: string) => {
    switch (buttonId) {
      case 'tenants':
        handleTenantsClick();
        break;

      case 'service-providers':
        handleServiceProvidersClick();
        break;

      default:
        break;
    }
  }, []);
  const handleAccClick = () => {
    setClicked(true);
  };

  const filterButton = (buttonId: string, buttonText: string) => {
    const isActive = buttonId === filterButtonActive;
    const buttonStyle = isActive
      ? 'mx-5 w-1/5 border bg-[#EDFDFF] border-[#3180BA] text-[#3180BA] py-2 rounded-2xl'
      : 'mx-5 w-1/5 border bg-white border-[#63696E] text-[#63696E] py-2 rounded-2xl';

    return (
      <button
        key={buttonId}
        className={buttonStyle}
        onClick={() => {
          handleToggle(buttonId);
          handleClick(buttonId);
        }}
      >
        {buttonText}
      </button>
    );
  };

  type DataTableProps = {
    userType: 'Admins' | 'Landlords' | 'Tenants' | 'Service Providers';
  };

  const DataTable: React.FC<DataTableProps> = ({ userType }) => {
    switch (userType) {
      case 'Service Providers':
        return (
          <ServiceProvidersAccounts
            clicked={isClicked}
            handleClick={handleAccClick}
            data={serviceProviderData}
          />
        );
      default:
        return (
          <TenantAccounts clicked={isClicked} handleClick={handleAccClick} data={tenantData} />
        );
    }
  };

  const handleDeleteClick = () => {
    setClicked(false);
    fetchTenantData();
    fetchServiceProviderData();
  };

  useEffect(() => {
    fetchTenantData();
    fetchServiceProviderData();

    if (initialRender) {
      handleToggle('tenants');
      handleClick('tenants');
      setUserType('Tenants');
    }
    setInitialRender(false);
  }, [initialRender, handleToggle, handleClick]);
  return (
    <>
      <LandlordNavbar />
      <div className={`h-screen bg-[#ECEDED] flex-1 ${isClicked ? 'opacity-20' : ''}`}>
        <a href="#/">
          <div className="flex items-center ml-5 pt-3" onClick={handleBack}>
            <img src={BackArrowIcon} alt="back arrow"></img>
            <p className="ml-5 text-xl">Back to Panel</p>
          </div>
        </a>
        <div className="h-auto w-full flex flex-col justify-center items-center">
          <div className="w-auto md:w-4/5">
            <div className="flex-grow flex flex-col justify-center items-center">
              <div className="text-left text-3xl w-full mb-4">
                <p>Accounts</p>
              </div>
              <div className="flex justify-center w-full mb-4 text-lg">
                {filterButton('tenants', 'Tenants')}
                {filterButton('service-providers', 'Service Providers')}
              </div>
              <div
                className="container mx-auto max-h-[600px] overflow-y-auto"
                style={{ maxWidth: '1329px' }}
              >
                <DataTable userType={userType} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute top-4 right-64">
        {isClicked && (
          <CreateAccountForm
            userType={userType.substring(0, userType.length - 1)}
            handleDelClick={handleDeleteClick}
          />
        )}
      </div>
    </>
  );
};

export default AccountCreation;
