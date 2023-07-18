import React from "react";

function _504_ErrorPage(){  // 504 Error Page (Gateway Timeout)

    return (
        <React.Fragment>
          { (
            <div className="bg-content flex flex-col h-screen justify-center items-center">
              <div className="relative flex bg-form border-gray-700 rounded-lg shadow sm:p-5  h-128 w-128 justify-center items-center">
                <form className="space-y-10">
                  <p className="text-5xl text-center font-bold h-5">504</p>
                  <p className="text-2xl text-center font-bold h-5">This page is taking way too long to load</p>
                  <p className="text-xl text-center font-medium">Please try again by refreshing. If this problem persists, please contact the system admin. </p>
                </form>
              </div>
            </div>
          )
          }</React.Fragment>)}

export default _504_ErrorPage;