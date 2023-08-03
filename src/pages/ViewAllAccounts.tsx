import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import CreateAccountForm from '../components/CreateAccountForm';
import AdminAccounts from '../components/tables/AdminAccounts';
import LandlordAccounts from '../components/tables/LandlordAccounts';
import ServiceProvidersAccounts from '../components/tables/ServiceProvidersAccounts';
import TenantAccounts from '../components/tables/TenantAccounts';
import BackArrowIcon from '../images/back_arrow_icon.svg';
import { client } from '../client';
import { Type, getValidator, querySyntax } from '@feathersjs/typebox';
const ViewAllAccounts = () => {
  const navigate = useNavigate();
  const [adminData, setAdminData] = useState([{ ID: '', Email: '' }]);
  const [tenantData, setTenantData] = useState([{ ID: '', Email: '', LeaseID: '' }]);
  const [landlordData, setLandlordData] = useState([{ ID: '', Email: '', BuildingID: '' }]);
  const [serviceProviderData, setServiceProviderData] = useState([{ ID: '', Email: '', BuildingID: '' }]);
  const [initialRender, setInitialRender] = useState(true);
  const [isClicked, setClicked] = useState(false);

  //Component for filter buttons
  const [filterButtonActive, setFilterButtonActive] = useState('');
  const getAdminData = async () => {
    try {
      const adminData = await client.service('users').find({ query: { typ: 3 } });
      const adminUsers = adminData.data;
      const adminUsersUpdated = adminUsers.map((user) => ({
        ID: user._id,
        Email: user.email,
      }));
      // console.log(adminUsersUpdated);
      return adminUsersUpdated;
    } catch (error) {
      console.error('Error fetching users:', error);
      return null;
    }
  };
  const fetchAdminData = async () => {
    try {
      const adminData = await getAdminData();

      console.log(adminData);

      if (adminData !== null) {
        setAdminData(adminData);
      } else {
        // Handle the case when adminData is null (error occurred)
        // You can set it to an empty array or handle it based on your use case.
        setAdminData([]);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
      // Handle the error case
      setAdminData([]);
    }
  };

  const getTenantData = async () => {
    try {
      const tenantData = await client.service('users').find({ query: { typ: 0 } });
      const tenantUsers = tenantData.data;
      const tenantUsersUpdated = tenantUsers.map((user) => ({
        ID: user._id,
        Email: user.email,
        LeaseID: user.leaseId|| ''
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

      console.log(tenantData);

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
  const getLandlordData = async () => {
    try {
      const landlordData = await client.service('users').find({ query: { typ: 2 } });
      const landlordUsers = landlordData.data;
      const landlordUsersUpdated = landlordUsers.map((user) => ({
        ID: user._id,
        Email: user.email,
        BuildingID: user.buildingId|| ''
      }));
      // console.log(adminUsersUpdated);
      return landlordUsersUpdated;
    } catch (error) {
      console.error('Error fetching landlord users:', error);
      return null;
    }
  };

  const fetchLandlordData = async () => {
    try {
      const landlordData = await getLandlordData();

      console.log(landlordData);

      if (landlordData !== null) {
        setLandlordData(landlordData);
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
        BuildingID: user.buildingId|| ''
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

      console.log(serviceProviderData);

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

  
  

  const handleAccClick = () => {
    setClicked(true);
  };
  const handleTenClick = () => {
    navigate('/TenantAddAcc');
  };
  const handleDeleteClick = () => {
    setClicked(false);
    fetchAdminData();
    fetchTenantData();
    fetchLandlordData();
    fetchServiceProviderData();
  };

  const handleToggle = useCallback(
    (buttonId: string) => {
      setFilterButtonActive(buttonId === filterButtonActive ? '' : buttonId);
    },
    [filterButtonActive]
  );

  const handleClick = useCallback((buttonId: string) => {
    switch (buttonId) {
      case 'tenants':
        handleTenantsClick();
        break;
      case 'landlords':
        handleLandlordsClick();
        break;
      case 'service-providers':
        handleServiceProvidersClick();
        break;
      case 'admins':
        handleAdminsClick();
        break;
      default:
        break;
    }
  }, []);

  const handleTenantsClick = () => {
    console.log('Tenants button clicked.');
    // Perform actions specific to tenants button
    setUserType('Tenants');
  };

  const handleLandlordsClick = () => {
    console.log('Landlords button clicked.');
    // Perform actions specific to landlords button
    setUserType('Landlords');
  };

  const handleServiceProvidersClick = () => {
    console.log('Service Providers button clicked.');
    // Perform actions specific to service providers button
    setUserType('Service Providers');
  };

  const handleAdminsClick = () => {
    console.log('Admins button clicked.');
    // Perform actions specific to admins button
    setUserType('Admins');
  };
  const handleBack = () => {
    navigate('/adminDashboard');
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

  const [userType, setUserType] = useState<
    'Admins' | 'Landlords' | 'Tenants' | 'Service Providers'
  >('Tenants');

  const DataTable: React.FC<DataTableProps> = ({ userType }) => {
    switch (userType) {
      case 'Admins':
        return <AdminAccounts clicked={isClicked} handleClick={handleAccClick} data={adminData} />;
      case 'Landlords':
        return <LandlordAccounts clicked={isClicked} handleClick={handleAccClick} data={landlordData}/>;
      case 'Service Providers':
        return <ServiceProvidersAccounts clicked={isClicked} handleClick={handleAccClick} data={serviceProviderData}/>;
      default:
        return <TenantAccounts clicked={isClicked} handleClick={handleTenClick} data={tenantData} />;
    }
  };

  useEffect(() => {
    
    fetchAdminData();
    fetchTenantData(); 
    fetchLandlordData();
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
      <div className={`h-auto bg-[#ECEDED] flex-1 ${isClicked ? 'opacity-20' : ''}`}>
        <a href="#/">
          <div className="flex items-center ml-5 mt-5" onClick={handleBack}>
            <img src={BackArrowIcon} alt="back arrow"></img>
            <p className="ml-5 text-xl">Back to Panel</p>
          </div>
        </a>
        <div className="h-auto w-full flex flex-col justify-center items-center">
          <div className="w-auto md:w-4/5">
            <div className="flex-grow flex flex-col justify-center items-center">
              <div className="container mx-auto" style={{ maxWidth: '1329px', height: '656px' }}>
                <div className="text-left text-3xl w-full mb-4">
                  <p>Accounts</p>
                </div>
                <div className="flex justify-between w-4/5 mb-4 text-lg">
                  {filterButton('tenants', 'Tenants')}
                  {filterButton('landlords', 'Landlords')}
                  {filterButton('service-providers', 'Service Providers')}
                  {filterButton('admins', 'Admins')}
                </div>
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

export default ViewAllAccounts;
