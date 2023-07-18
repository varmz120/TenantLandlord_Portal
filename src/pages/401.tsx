import React from "react";
import ReturnToHomePage from "../components/ReturnToHomePage";


function _401_ErrorPage(){ // 401 Error Page (Unauthorized)

    return (
        <React.Fragment>
          { (
            <div className="bg-content flex flex-col h-screen justify-center items-center">
              <div className="relative flex bg-form border-gray-700 rounded-lg shadow sm:p-5  h-128 w-128 justify-center items-center">
                <form className="space-y-10">
                  <p className="text-5xl text-center font-bold h-5">401 - Unauthorised</p>
                  <p className="text-l text-center font-medium h-5">You authorisation failed. Please try again.</p>
                  <div className="absolute bottom-10 right-6">
                    <ReturnToHomePage
                        link={'/'}/>
                    </div>
                </form>
              </div>
            </div>
          )
          }</React.Fragment>)}

export default _401_ErrorPage;