import React from "react";

function _RunTime_ErrorPage(){  // RunTime Error Page

    return (
        <React.Fragment>
          { (
            <div className="bg-content flex flex-col h-screen justify-center items-center">
              <div className="relative flex bg-form border-gray-700 rounded-lg shadow sm:p-5  h-128 w-128 justify-center items-center">
                <form className="space-y-20">
                  <p className="text-5xl text-center font-bold h-5">Oops! Something went wrong.</p>
                  <p className="text-xl text-center font-medium">We're sorry, but an unexpected error occurred.</p>
                </form>
              </div>
            </div>
          )
          }</React.Fragment>)}

export default _RunTime_ErrorPage;