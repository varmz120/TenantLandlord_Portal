import React from "react";

function _500_ErrorPage(){ // 500 Error Page (Internal Server Error)

    return (
        <React.Fragment>
          { (
            <div className="bg-content flex flex-col h-screen justify-center items-center">
              <div className="relative flex bg-form border-gray-700 rounded-lg shadow sm:p-5  h-128 w-128 justify-center items-center">
                <form className="space-y-10">
                  <p className="text-5xl text-center font-bold h-5">500</p>
                  <p className="text-2xl text-center font-medium h-5">There was an error.<br></br>Please try again later.</p>
                </form>
              </div>
            </div>
          )
          }</React.Fragment>)}

export default _500_ErrorPage;