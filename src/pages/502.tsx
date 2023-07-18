import React from "react";

function _502_ErrorPage(){  // 502 Error Page (Bad Gateway)

    return (
        <React.Fragment>
          { (
            <div className="bg-content flex flex-col h-screen justify-center items-center">
              <div className="relative flex bg-form border-gray-700 rounded-lg shadow sm:p-5  h-128 w-128 justify-center items-center">
                <form className="space-y-10">
                  <p className="text-5xl text-center font-bold h-5">502 - Bad Gateway</p>
                  <p className="text-xl text-center font-medium h-5">The server encountered a temporary error.<br></br>Please try again later.</p>
                </form>
              </div>
            </div>
          )
          }</React.Fragment>)}

export default _502_ErrorPage;