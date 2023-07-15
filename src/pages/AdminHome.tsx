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

const AdminHome = () => {
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

  return (
    <div className="AdminHome bg-[#ECEDED] flex-1">
      <div className="flex items-center justify-center">
        <p className="text-xl">Administrator Panel</p>
        <img className="ml-2" src={gearIcon} alt="Settings Icon" />
      </div>
      <div className="flex items-center justify-center">
        <div className="flex">
          <div
            className="flex flex-col w-32 h-32 bg-white hover:bg-[#31556F] cursor-pointer mr-2 items-center justify-center"
            onMouseEnter={handleBuildingsActive}
            onMouseLeave={handleBuildingsInactive}
          >
            <p className={buildingsIsActive ? 'text-white' : 'text-black'}>Buildings</p>
            <img src={buildingsIsActive ? buildingsIconDark : buildingsIcon} />
          </div>
          <div
            className="flex flex-col  w-32 h-32 bg-white hover:bg-[#31556F] cursor-pointer mr-16 items-center justify-center"
            onMouseEnter={handleAccountsActive}
            onMouseLeave={handleAccountsInactive}
          >
            <p className={accountsIsActive ? 'text-white' : 'text-black'}>Accounts</p>
            <img src={accountsIsActive ? accountsIconDark : accountsIcon} className="mr-0" />
          </div>
          <div
            className="flex flex-col  w-32 h-32 bg-white hover:bg-[#31556F] cursor-pointer mr-2 items-center justify-center"
            onMouseEnter={handleWebAppActive}
            onMouseLeave={handleWebAppInactive}
          >
            <p className={webAppIsActive ? 'text-white' : 'text-black'}>Web App</p>
            <img src={webAppIsActive ? webAppIconDark : webAppIcon} className="mr-0" />
          </div>
          <div
            className="flex flex-col w-32 h-32 bg-white hover:bg-[#31556F] cursor-pointer items-center justify-center"
            onMouseEnter={handleDatabaseActive}
            onMouseLeave={handleDatabaseInactive}
          >
            <p className={databaseIsActive ? 'text-white' : 'text-black'}>Database</p>
            <img src={databaseIsActive ? databaseIconDark : databaseIcon} className="mr-0" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
