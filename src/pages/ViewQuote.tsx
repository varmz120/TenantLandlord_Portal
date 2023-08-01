import AreaField from '../components/AreaField';
import LineField from '../components/LineField';
import ActionRequired from '../components/ActionRequired';
import BackButton from '../components/BackButton';
import ActionButton from '../components/ActionButton';
import ExampleQuote from '../images/example_quote.png';

import { useNavigate, useLocation, Navigate } from 'react-router-dom';
import React, { MouseEvent, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

// TODO: Pass in Blob URIs here from MongoDB and test here
// const getPdfUrl = async (path: string) => {
//   const url = path;

//   const response = await fetch(url);
//   const blob = await response.blob();

//   return URL.createObjectURL(blob);
// };

function ViewQuote() {
  // Navigation & routing
  const navigate = useNavigate();
  const locate = useLocation();
  var formState = locate.state ? locate.state.formState : null; // Temporary -> for demo purposes w/o backend
  var isSubmit = locate.state ? locate.state.isSubmit : false; // Temporary -> for demo purposes w/o backend
  var title = formState ? formState.formTitle : ''; // Temporary -> for demo purposes w/o backend
  var ticket_ID = formState ? formState.formID : ''; // Temporary -> for demo purposes w/o backend

  // Context
  const { user } = useContext(AuthContext);

  // UseStates & Backend Data - Temporarily None -> for demo purposes w/o backend
  // Mock static Values
  var location = 'SunPlaza';
  var landlord = 'Mr Soy';
  var unit = '01-42';
  var amount = '250.00';
  var description = 'Lorem ipsum blablabla Lorem ipsum blablabla Lorem ipsum blablabla';

  // Handlers - None
  // TODO: Download quote handler here
  const handleAcceptClick = (event: MouseEvent<HTMLButtonElement>): void => {
    formState.formStatus = 'Pending Approval';
    navigate('/viewDetails', { state: { formState, isSubmit: true } });
  };

  return (
    <React.Fragment>
      {/* // When user is not logged in */}
      {user === null ? (
        <Navigate to="/401" replace={true} />
      ) : (
        <React.Fragment>
          {/* // When user is logged in AND a tenant */}
          {user?.typ === 0 && formState ? (
            <div className="flex flex-col font-3xl" id="viewTicket">
              <BackButton
                type="button"
                label={'ticket details'}
                handleClick={() =>
                  navigate('/viewDetails', { state: { formState, isSubmit: !isSubmit } })
                }
              />
              <div className="flex justify-center">
                <p className="text-headerText pb-5 text-2xl font-medium">
                  Quotation for #00{ticket_ID} : {location} Unit {unit}
                </p>
              </div>
              <div className="flex mx-auto my-auto max-w-content bg-form border-gray-200 rounded-lg shadow sm:p-7">
                <div className="grid grid-cols-2">
                  <form className="space-y-5">
                    <p className="text-lg text-left font-medium">{title}</p>
                    <hr className="h-[1px] bg-gray-300 border-0 drop-shadow-md"></hr>
                    <LineField
                      type={'text'}
                      label="Uploaded by"
                      padding_right="106"
                      value={landlord}
                      name="landlord"
                      placeholder={''}
                      error={''}
                      disabled={true}
                      layout=""
                      classnames="w-2/5"
                      onChange={() => null}
                    />
                    <LineField
                      type={'text'}
                      label="Total Amount (SGD)"
                      padding_right="50"
                      value={amount}
                      name="amount"
                      placeholder={''}
                      error={''}
                      disabled={true}
                      layout=""
                      classnames="w-2/5"
                      onChange={() => null}
                    />
                    <AreaField
                      label={'Description'}
                      classnames="w-4/5"
                      padding_right={'115'}
                      value={description}
                      id="description"
                      disabled={true}
                      layout=""
                      error={''}
                      placeholder="Please inclue any additional remarks here."
                      onChange={() => null}
                    />
                    <hr className="h-[2px] bg-gray-300 border-0 drop-shadow-md"></hr>
                    {isSubmit ? (
                      <React.Fragment>
                        <ActionRequired
                          label={'Action Required'}
                          padding_right={'0'}
                          alert={true}
                        />
                        <div className="flex flex-row gap-x-4">
                          <ActionButton
                            value={'Accept'}
                            padding_right={'0'}
                            type="accept"
                            firstViewState={false}
                            toggle={false}
                            onClick={handleAcceptClick}
                          />
                          <ActionButton
                            value={'Reject'}
                            padding_right={'0'}
                            type="reject"
                            firstViewState={false}
                            toggle={false}
                            onClick={() =>
                              navigate('/viewDetails', {
                                state: { formState, isSubmit: false },
                              })
                            }
                          />
                        </div>
                      </React.Fragment>
                    ) : (
                      <ActionRequired label={'Action Required'} padding_right={'0'} alert={false} />
                    )}
                  </form>
                  <div className="border-l-2 border-gray-300 drop-shadow-md items-center">
                    <p className="text-lg text-left font-medium text-headerText text-center">
                      Document View
                    </p>
                    <img
                      src={ExampleQuote}
                      className="flex mx-auto mt-3 h-4/5 w-2/3"
                      alt="Quote PDF"
                    />
                    {/*
                      <iframe src='..//..//public//Example_Quote.pdf' title='alert' className='flex mx-auto h-4/5 w-2/3'/>
                       <iframe srcDoc={'<html><body><p>Quote will be displayed here in iframe.</p></body></html>'} className='flex mx-auto h-1/4 w-2/3 mb-1'/> 
                       TODO: Add download button capability*/}
                    <ActionButton
                      value={'Download Quote'}
                      padding_right={'0'}
                      type="download"
                      firstViewState={false}
                      toggle={false}
                      onClick={() => null}
                    />
                  </div>
                </div>
              </div>
            </div>
          ) : (
            // When user is logged in but NOT a tenant OR in this case of demo, no submission of tenant ticket was made...
            <Navigate to="/403" replace={true} />
          )}
        </React.Fragment>
      )}
    </React.Fragment>
  );
}

export default ViewQuote;
