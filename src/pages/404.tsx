import React from 'react';
import ReturnToHomePage from '../components/ReturnToHomePage';

function ErrorPage404() {
  // 404 Error Page (Page Not Found)

  return (
    <React.Fragment>
      {
        <div className="bg-content flex flex-col h-screen justify-center items-center">
          <div className="relative flex bg-form border-gray-700 rounded-lg shadow sm:p-5  h-128 w-128 justify-center items-center">
            <form className="space-y-10">
              <p className="text-5xl text-center font-bold h-5">404</p>
              <p className="text-2xl text-center font-bold h-5">Page Not Found</p>
              <div className="flex justify-center">
                {' '}
                {/* This is for memes, please delete LOL */}
                <img
                  className="h-1/2 w-1/2 rounded-3xl"
                  src={'https://media.tenor.com/APOmFMmvDBkAAAAd/anya-forger.gif'}
                  alt="anya-gif"
                />
              </div>
              <div className="absolute bottom-10 right-6">
                <ReturnToHomePage link={'/'} message_type={1} />
              </div>
              <div className="absolute bottom-5 right-6">
                <ReturnToHomePage
                  link={
                    'https://docs.google.com/document/d/1_O_hsn5YzNWzTGS3dwcCog4zCpdEBHeitU_q5kNC4B0/edit#'
                  }
                  message_type={2}
                />
              </div>
            </form>
          </div>
          <div>
            <span className="inline-flex justify-left">
              <label className="text-xs font-light text-headerText">
                All rights for gif belongs to the creator of Spy x Family.{' '}
                {/* This is for memes, please delete LOL */}
              </label>
            </span>
          </div>
        </div>
      }
    </React.Fragment>
  );
}

export default ErrorPage404;
