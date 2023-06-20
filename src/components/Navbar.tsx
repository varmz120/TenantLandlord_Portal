import React from 'react';
import homeImage from '../images/home.svg';
import userIcon from '../images/user_icon.svg';

const Navbar = () => {
  return (
    <nav className="max-w-screen-3xl -border-gray-200 bg-navbar">
      <div className="flex flex-wrap items-center justify-between mx-10 ml-5 p-4">
        <a href="https://flowbite.com/" className="flex items-center">
          <img src={homeImage} className="h-6 mr-3" alt="Flowbite Logo" />
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
        <div className="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border rounded-lg md:flex-row md:space-x-8 md:mt-0 md:border-0">
            <li className="flex items-center">
              <a
                href="#"
                className="block text-white rounded md:bg-transparent md:p-0"
                aria-current="page"
              >
                Home
              </a>
            </li>
            <li className="flex items-center">
              <a
                href="#"
                className="block py-2 pl-3 pr-4 text-white rounded md:bg-transparent md:p-0"
              >
                Notifications
              </a>
            </li>
            <li className="flex items-center">
              <a
                href="#"
                className="block text-white rounded flex border-solid border-1 px-2 py-1 flex items-center"
                style={{ color: '#3180BA', backgroundColor: '#EDFDFF' }}
              >
                <img src={userIcon} className="h-5 mx-3 ml-4" alt="?"></img>
                <div className="mr-4">Username</div>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
