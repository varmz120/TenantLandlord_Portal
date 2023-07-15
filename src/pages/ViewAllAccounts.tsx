import React, { useState, useEffect } from 'react';
import BackArrowIcon from '../images/back_arrow_icon.svg';
import trashBinIcon from '../images/trash_bin_icon.svg';
import addServiceProviderIcon from '../images/add_service_provider_icon.svg';
import filterIcon from '../images/filter_icon.svg';
import pencilEditIcon from '../images/pencil_edit_icon.svg';
import AdminAccounts from '../components/tables/AdminAccounts';
import LandlordAccounts from '../components/tables/LandlordAccounts';
import TenantAccounts from '../components/tables/TenantAccounts';
import ServiceProvidersAccounts from '../components/tables/ServiceProvidersAccounts';

const ViewAllAccounts = () => {
  const [initialRender, setInitialRender] = useState(true);

  //Component for filter buttons
  const [filterButtonActive, setFilterButtonActive] = useState('');

  const handleToggle = (buttonId: string) => {
    setFilterButtonActive(buttonId === filterButtonActive ? '' : buttonId);
  };

  const handleClick = (buttonId: string) => {
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
  };

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
        return <AdminAccounts />;
      case 'Landlords':
        return <LandlordAccounts />;
      case 'Service Providers':
        return <ServiceProvidersAccounts />;
      default:
        return <TenantAccounts />;
    }
  };

  useEffect(() => {
    if (initialRender) {
      handleToggle('tenants');
      handleClick('tenants');
      setUserType('Tenants');
    }
    setInitialRender(false);
  }, []);

  return (
    <div className="h-auto bg-[#ECEDED] flex-1 ">
      <div className="flex items-center ml-5 mt-5">
        <img src={BackArrowIcon}></img>
        <p className="ml-5 text-xl">Back to Panel</p>
      </div>
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
  );
};

export default ViewAllAccounts;