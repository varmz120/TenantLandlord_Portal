import React, { useState } from 'react';
import homeImage from '../images/home.svg';
import userIcon from '../images/user_icon.svg';
import userIconDark from '../images/user_icon_dark.svg';
import { useNavigate } from 'react-router-dom';

const ServProvNavbar = () => {
  const navigate = useNavigate();
  const [usernameIsActive, setUsernameIsActive] = useState(false);
  const handleUsernameActive = () => {
    setUsernameIsActive(true);
  };

  const handleUsernameInactive = () => {
    setUsernameIsActive(false);
  };

  const homeOnClick = () => {
    navigate('/ServProvDashboard');
  }


  return (
    <nav className="max-w-screen-3xl -border-gray-200 bg-[#31556F]">
      <div className="flex flex-wrap items-center justify-between ">
        <a
          href="/LandlordDashboard"
          className="flex items-center h-full items-center flex text-white rounded md:bg-transparent p-4
									hover:bg-gradient-to-r from-[#193446] via-[#0b4975] to-[#193446]"
        >
          <img src={homeImage} className="h-6" alt="Flowbite Logo" />
        </a>
        <button
          data-collapse-toggle="navbar-default"
          type="button"
          className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-default"
          aria-expanded="false"
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-6 h-6"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </button>
        <div className="h-full hidden w-full md:block md:w-auto" id="navbar-default">
          <ul className="h-full font-medium flex flex-col p-4 md:p-0 mt-4 border rounded-lg md:flex-row md:mt-0 md:border-0">
            <li className="flex items-center">
              <a
                href="/ServProvDashboard"
                className="h-full items-center flex text-white rounded md:bg-transparent p-4
									hover:bg-gradient-to-r from-[#193446] via-[#0b4975] to-[#193446] "
                // aria-current="page"
                onClick={homeOnClick}
              >
                Home
              </a>
            </li>
            <li
            // className="flex items-center content-center justify-center ml-0"
            >
              <a
                href="/notification"
                className="h-full items-center flex text-white rounded md:bg-transparent p-4
									hover:bg-gradient-to-r from-[#193446] via-[#0b4975] to-[#193446] "
              >
                Notifications
              </a>
            </li>
            <li className="flex items-center mx-3 mr-5">
              <a
                href="/"
                className="block rounded flex border-solid border-1 px-2 py-1 
									flex items-center text-[#3180ba] bg-[#edfdff] active:text-[#cbe6ec] active:bg-[#193446]"
                onMouseDown={handleUsernameActive}
                onMouseUp={handleUsernameInactive}
                onMouseLeave={handleUsernameInactive}
              >
                <img
                  src={usernameIsActive ? userIconDark : userIcon}
                  className="h-5 mx-3 ml-4"
                  alt="user"
                ></img>
                <div className="mr-4">Username</div>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default ServProvNavbar;
