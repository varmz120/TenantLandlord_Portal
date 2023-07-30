import React from 'react';
import ReturnToHomePage from '../components/ReturnToHomePage';

function _401_ErrorPage() {
  // 401 Error Page (Unauthorized)

  return (
    <React.Fragment>
      {
        <div className="bg-content flex flex-col h-screen justify-center items-center">
          <div className="relative flex bg-form border-gray-700 rounded-lg shadow p-5 h-64 w-80 md:h-128 md:w-128 justify-center items-top md:items-center">
            <form className="md:space-y-10">
              <p className="text-3xl md:text-5xl text-center font-bold h-24 md:h-5">
                401 - Unauthorised
              </p>
              <p className="text-l text-center font-medium h-10 md:h-5">
                Your authorisation failed. Please try again.
              </p>
              <div className="absolute bottom-5 right-2 md:bottom-10 md:right-6">
                <ReturnToHomePage link={'/'} message_type={1} />
              </div>
            </form>
          </div>
        </div>
      }
    </React.Fragment>
  );
}

export default _401_ErrorPage;
