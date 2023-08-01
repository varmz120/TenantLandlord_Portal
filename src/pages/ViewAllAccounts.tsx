import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import CreateAccountForm from '../components/CreateAccountForm';
import AdminAccounts from '../components/tables/AdminAccounts';
import LandlordAccounts from '../components/tables/LandlordAccounts';
import ServiceProvidersAccounts from '../components/tables/ServiceProvidersAccounts';
import TenantAccounts from '../components/tables/TenantAccounts';
import BackArrowIcon from '../images/back_arrow_icon.svg';
const ViewAllAccounts = () => {
  const navigate = useNavigate();
  const [initialRender, setInitialRender] = useState(true);
  const [isClicked, setClicked] = useState(false);

  //Component for filter buttons
  const [filterButtonActive, setFilterButtonActive] = useState('');

  const handleAccClick = () => {
    setClicked(true);
  };
  const handleTenClick = () => {
    navigate('/TenantAddAcc');
  };
  const handleDeleteClick = () => {
    setClicked(false);
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
        return <AdminAccounts clicked={isClicked} handleClick={handleAccClick} />;
      case 'Landlords':
        return <LandlordAccounts clicked={isClicked} handleClick={handleAccClick} />;
      case 'Service Providers':
        return <ServiceProvidersAccounts clicked={isClicked} handleClick={handleAccClick} />;
      default:
        return <TenantAccounts clicked={isClicked} handleClick={handleTenClick} />;
    }
  };

  useEffect(() => {
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
