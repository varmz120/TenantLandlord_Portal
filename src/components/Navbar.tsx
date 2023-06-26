import { useState } from 'react';
import homeImage from '../images/home.svg';
import userIcon from '../images/user_icon.svg';
import userIconDark from '../images/user_icon_dark.svg';
import { url } from 'inspector';

function Navbar() {
  const [usernameIsActive, setUsernameIsActive] = useState(false);
  const handleUsernameActive = () => {
    setUsernameIsActive(true);
  };

  const handleUsernameInactive = () => {
    setUsernameIsActive(false);
  };

  return (
    <nav className="max-w-screen h-12 border-gray-200 bg-navbar">
      <div className="flex flex-wrap items-center justify-between h-12">
        <a
          href="#"
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
              fillRule="evenodd"
              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
              clipRule="evenodd"
            ></path>
          </svg>
        </button>
        <div className="h-full hidden w-full md:block md:w-auto" id="navbar-default">
          <ul className="h-full font-base text-sm flex flex-col p-4 md:p-0 mt-4 border rounded-lg md:flex-row md:mt-0 md:border-0">
            <li className="flex items-center">
              <a
                href="#"
                className="h-full items-center flex text-white rounded md:bg-transparent p-4
									hover:bg-gradient-to-r from-[#193446] via-[#0b4975] to-[#193446] "
                aria-current="page"
              >
                Home
              </a>
            </li>
            <li
            // className="flex items-center content-center justify-center ml-0"
            >
              <a
                href="#"
                className="h-full items-center flex text-white rounded md:bg-transparent p-4
									hover:bg-gradient-to-r from-[#193446] via-[#0b4975] to-[#193446] "
              >
                Notifications
              </a>
            </li>
            <li className="flex items-center mx-3 mr-5">
              <a
                href="#"
                className="group block rounded flex border-solid border-1 px-1 py-1 
									flex items-center text-[#3180ba] bg-[#edfdff] hover:text-[#cbe6ec] hover:bg-[#193446] active:text-[#cbe6ec] active:bg-[#193446]"
                onMouseDown={handleUsernameActive}
                onMouseUp={handleUsernameInactive}
                onMouseLeave={handleUsernameInactive}
              >
              <div className={"w-8 h-5 mx-3 ml-3 bg-contain bg-center bg-no-repeat bg-[url('./images/user_icon.svg')] group-hover:bg-[url('./images/user_icon_dark.svg')]"}></div>
                {/* <img
                  src={usernameIsActive ? userIconDark : userIcon}
                  className="w-8 h-5 mx-3 ml-3"
                  alt="?"
                ></img> */}
                <div className="mr-4">Log In</div>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
