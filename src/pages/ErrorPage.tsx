import React from "react";
import ReturnToHomePage from "../components/ReturnToHomePage";


function ErrorPage(){

    return (
        // ONLY FOR TESTING PURPOSES
        <React.Fragment>
          { (
            // ACTUAL PAGE
            <div className="bg-content flex flex-col h-screen justify-center items-center">
              <div className="relative flex bg-form border-gray-700 rounded-lg shadow sm:p-5  h-128 w-128 justify-center items-center">
                <form className="space-y-5">
                  <p className="text-2xl text-center font-bold h-5">404</p>
                  <p className="text-2xl text-center font-bold h-5">Page Not Found</p>
                  <div className="absolute bottom-10 right-6">
                    <ReturnToHomePage
                        link={'/'}/>
                    </div>
                </form>
              </div>
            </div>
          )
          }</React.Fragment>)}

export default ErrorPage;