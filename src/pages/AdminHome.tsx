import { useState } from 'react';
import gearIcon from '../images/gear_icon.svg';
import buildingsIcon from '../images/buildings_icon.svg';
import buildingsIconDark from '../images/buildings_icon_dark.svg';
import accountsIcon from '../images/accounts_icon.svg';
import accountsIconDark from '../images/accounts_icon_dark.png';
import webAppIcon from '../images/webapp_icon.svg';
import webAppIconDark from '../images/webapp_icon_dark.svg';
import databaseIcon from '../images/database_icon.svg';
import databaseIconDark from '../images/database_icon_dark.svg';
import { useNavigate } from 'react-router-dom';

const AdminHome = () => {
  const navigate = useNavigate();
  const [buildingsIsActive, setBuildingsIsActive] = useState(false);
  const handleBuildingsActive = () => {
    setBuildingsIsActive(true);
  };

  const handleBuildingsInactive = () => {
    setBuildingsIsActive(false);
  };

  const [accountsIsActive, setaccountsIsActive] = useState(false);
  const handleAccountsActive = () => {
    setaccountsIsActive(true);
  };

  const handleAccountsInactive = () => {
    setaccountsIsActive(false);
  };

  const [webAppIsActive, setwebAppIsActive] = useState(false);
  const handleWebAppActive = () => {
    setwebAppIsActive(true);
  };

  const handleWebAppInactive = () => {
    setwebAppIsActive(false);
  };

  const [databaseIsActive, setdatabaseIsActive] = useState(false);
  const handleDatabaseActive = () => {
    setdatabaseIsActive(true);
  };

  const handleDatabaseInactive = () => {
    setdatabaseIsActive(false);
  };

  const buildingsOnClick = () => {
    navigate('/Buildings');
  };

  const accountsOnClick = () => {
    navigate('/Accounts');
  };

  const webAppOnClick = () => {
    console.log('webapp clicked');
  };

  const databaseOnClick = () => {
    console.log('database clicked');
  };

  return (
    <div className="AdminHome bg-[#ECEDED] flex-1 font-bold w-full">
      <div className="flex items-center justify-center mt-64 mb-16 sm:">
        <p className="text-3xl">Administrator Panel</p>
        <img
          className="ml-4 w-auto h-auto max-w-full max-h-full"
          src={gearIcon}
          alt="Settings Icon"
        />
      </div>
      <div className="flex items-center justify-center">
        <div className="flex">
          <div
            className="flex flex-col w-40 h-40 bg-white hover:bg-[#31556F] cursor-pointer mr-2 items-center justify-center rounded-xl"
            onMouseEnter={handleBuildingsActive}
            onMouseLeave={handleBuildingsInactive}
            onClick={buildingsOnClick}
          >
            <p className={buildingsIsActive ? 'text-white' : 'text-black'}>Buildings</p>
            <img
              src={buildingsIsActive ? buildingsIconDark : buildingsIcon}
              className="mt-3 w-auto h-auto max-w-full max-h-full"
            />
          </div>
          <div
            className="flex flex-col w-40 h-40 bg-white hover:bg-[#31556F] cursor-pointer mr-16 items-center justify-center rounded-xl"
            onMouseEnter={handleAccountsActive}
            onMouseLeave={handleAccountsInactive}
            onClick={accountsOnClick}
          >
            <p className={accountsIsActive ? 'text-white' : 'text-black'}>Accounts</p>
            <img
              src={accountsIsActive ? accountsIconDark : accountsIcon}
              className="mt-3 w-auto h-auto max-w-full max-h-full"
            />
          </div>
          <div
            className="flex flex-col w-40 h-40 bg-white hover:bg-[#31556F] cursor-pointer mr-2 items-center justify-center rounded-xl"
            onMouseEnter={handleWebAppActive}
            onMouseLeave={handleWebAppInactive}
            onClick={webAppOnClick}
          >
            <p className={webAppIsActive ? 'text-white' : 'text-black'}>Web App</p>
            <img
              src={webAppIsActive ? webAppIconDark : webAppIcon}
              className="mt-3 w-auto h-auto max-w-full max-h-full"
            />
          </div>
          <div
            className="flex flex-col w-40 h-40 bg-white hover:bg-[#31556F] cursor-pointer items-center justify-center rounded-xl"
            onMouseEnter={handleDatabaseActive}
            onMouseLeave={handleDatabaseInactive}
            onClick={databaseOnClick}
          >
            <p className={databaseIsActive ? 'text-white' : 'text-black'}>Database</p>
            <img
              src={databaseIsActive ? databaseIconDark : databaseIcon}
              className="mt-3 w-auto h-auto max-w-full max-h-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
