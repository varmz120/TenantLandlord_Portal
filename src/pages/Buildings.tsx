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
import CreateAccountForm from '../components/CreateAccountForm';
import BuildingsTable from '../components/tables/BuildingsTable';
import BuildingDetailsForm from '../components/BuildingDetailsForm';
import { useNavigate } from 'react-router-dom';

const Buildings = () => {
  const navigate = useNavigate();
  const [isClicked, setClicked] = useState(false);
  const handleAccClick = () => {
    setClicked(true);
  };
  const handleDeleteClick = () => {
    setClicked(false);
  };
  const handleBack = () => {
    navigate('/');
  };
  return (
    <>
      <div className={`h-auto bg-[#ECEDED] flex-1 ${isClicked ? 'opacity-20' : ''}`}>
        <a href="#">
          <div className="flex items-center ml-5 mt-5" onClick={handleBack}>
            <img src={BackArrowIcon}></img>
            <p className="ml-5 text-xl">Back to Panel</p>
          </div>
        </a>
        <div className="h-auto w-full flex flex-col justify-center items-center">
          <div className="w-auto md:w-4/5">
            <div className="flex-grow flex flex-col justify-center items-center">
              <div className="container mx-auto" style={{ maxWidth: '1329px', height: '656px' }}>
                <div className="text-left text-3xl w-full mb-4">
                  <p>Buildings</p>
                </div>

                <BuildingsTable clicked={isClicked} handleClick={handleAccClick} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute top-8 right-64">
        {isClicked && <BuildingDetailsForm handleDelClick={handleDeleteClick} />}
      </div>
    </>
  );
};

export default Buildings;
