import React from "react";

function _RunTime_ErrorPage() {
  // RunTime Error Page

  return (
    <React.Fragment>
      {
        <div className="bg-content flex flex-col h-screen justify-center items-center">
          <div className="relative flex bg-form border-gray-700 rounded-lg shadow p-5 h-64 w-80 md:h-128 md:w-128 justify-center items-top md:items-center">
            <form className="md:space-y-10">
              <p className="text-3xl md:text-5xl text-center font-bold h-28 md:h-20">Oops! Something went wrong.</p>
              <p className="text-xl text-center font-medium">
                We're sorry, but an unexpected error occurred.
              </p>
            </form>
          </div>
        </div>
      }
    </React.Fragment>
  );
}

export default _RunTime_ErrorPage;
