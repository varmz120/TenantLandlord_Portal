import React from 'react';
import ReturnToHomePage from '../components/ReturnToHomePage';

function _404_ErrorPage() {
  // 404 Error Page (Page Not Found)

  return (
    <React.Fragment>
      {
        <div className="bg-content flex flex-col h-screen justify-center items-center">
          <div className="relative flex bg-form border-gray-700 rounded-lg shadow p-5 h-80 w-64 md:h-128 md:w-128 justify-center items-center">
            <form className="md:space-y-10">
              <p className="text-5xl text-center font-bold h-10 md:h-5">404</p>
              <p className="text-2xl text-center font-bold h-10 md:h-5">Page Not Found</p>
              <div className="absolute bottom-5 right-2 md:bottom-10 md:right-6">
                <ReturnToHomePage link={'/'} message_type={1} />
              </div>
              <div className="absolute bottom-1 right-2 md:bottom-5 md:right-6">
                <ReturnToHomePage
                  link={
                    'https://docs.google.com/document/d/1_O_hsn5YzNWzTGS3dwcCog4zCpdEBHeitU_q5kNC4B0/edit#'
                  }
                  message_type={2}
                />
              </div>
            </form>
          </div>
        </div>
      }
    </React.Fragment>
  );
}

export default _404_ErrorPage;
