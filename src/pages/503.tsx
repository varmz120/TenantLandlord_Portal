import React from "react";

function _503_ErrorPage(){  // 503 Error Page (Service Unavailable)

    return (
        <React.Fragment>
          { (
            <div className="bg-content flex flex-col h-screen justify-center items-center">
              <div className="relative flex bg-form border-gray-700 rounded-lg shadow sm:p-5  h-128 w-128 justify-center items-center">
                <form className="space-y-10">
                  <p className="text-5xl text-center font-bold h-5">503</p>
                  <p className="text-2xl text-center font-bold h-5">Service Unavailable</p>
                  <p className="text-xl text-center font-medium">Please try again later.</p>
                </form>
              </div>
            </div>
          )
          }</React.Fragment>)}

export default _503_ErrorPage;