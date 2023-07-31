import AreaField from '../components/AreaField';
import LineField from '../components/LineField';
import Gallery from '../components/Gallery';
import Status from '../components/Status';
import ActionRequired from '../components/ActionRequired';
import BackButton from '../components/BackButton';
import ActionButton from '../components/ActionButton';
import { useNavigate, useLocation, Navigate } from 'react-router-dom';
import React, { useContext, MouseEvent } from 'react';
import { AuthContext } from '../contexts/AuthContext';

function ViewTicket() {
  // Navigation & routing
  const navigate = useNavigate();
  const locate = useLocation();

  const formState = locate.state ? locate.state.formState : null; // Temporary -> for demo purposes w/o backend
  var isSubmit = locate.state ? locate.state.isSubmit : false; // Temporary -> for demo purposes w/o backend
  var title = formState ? formState.formTitle : ''; // Temporary -> for demo purposes w/o backend
  var category = formState ? formState.formCategory : ''; // Temporary -> for demo purposes w/o backend
  var description = formState ? formState.formDescription : ''; // Temporary -> for demo purposes w/o backend
  var ticket_ID = formState ? formState.formID : ''; // Temporary -> for demo purposes w/o backend
  var status = formState ? formState.formStatus : ''; // // Temporary -> for demo purposes w/o backend
  var isClosed = locate.state ? locate.state.isClosed : false; // Temporary -> for demo purposes w/o backend

  // Context
  const { user } = useContext(AuthContext);

  // UseStates & Backend Data - Temporarily None -> for demo purposes w/o backend
  // const [formState, setFormState] = useState<string | any>({
  //   formTitle: title,
  //   formID: ticket_ID,
  //   formStatus: status,
  //   formCategory: category,
  //   formDescription: description,
  //   formAttachments: attachments,
  //   formAcknowledgement: form.formAcknowledgement,
  // });
  // Mock static Values
  var building = 'SunPlaza';
  var unit = '01-42';

  // Handlers
  const handleCloseTicket = (event: MouseEvent<HTMLButtonElement | HTMLDivElement>): void => {
    event.preventDefault();

    formState.formStatus = 'Closed';
    navigate('/tenantDashboard', {
      state: { formState, isSubmit: true, isClosed: true },
    });
  };

  return (
    <React.Fragment>
      {/* // When user is not logged in */}
      {user === null ? (
        <Navigate to="/401" replace={true} />
      ) : (
        <React.Fragment>
          {/* // When user is logged in AND a tenant */}
          {user?.userType === 0 && formState ? (
            <div className="flex flex-col font-3xl" id="viewTicket">
              <BackButton
                type="button"
                label={'all tickets'}
                handleClick={() =>
                  navigate('/tenantDashboard', { state: { formState, isSubmit, isClosed } })
                }
              />
              <div className="flex justify-center">
                <p className="text-headerText pb-5 text-2xl font-medium">
                  Service Ticket #00{ticket_ID} : {building} Unit {unit}
                </p>
              </div>
              <div className="flex flex-row justify-center">
                <div className="flex w-fit bg-form border-gray-200 rounded-lg shadow sm:p-7">
                  <form className="space-y-4">
                    <div className="flex flex-row w-full">
                      <p className="flex text-lg text-left font-medium">{title}</p>
                      {isSubmit ? (
                        <ActionButton
                          value={'View Quote'}
                          padding_right={'30'}
                          type="quote"
                          firstViewState={false}
                          toggle={false}
                          onClick={() =>
                            navigate('/viewQuote', { state: { formState, isSubmit: false } })
                          }
                        />
                      ) : null}
                    </div>
                    <hr className="h-[1px] bg-gray-300 border-0 drop-shadow-md"></hr>
                    <LineField
                      type={'text'}
                      label="Category"
                      padding_right="50"
                      value={category}
                      name="category"
                      placeholder={''}
                      error={''}
                      disabled={true}
                      layout=""
                      classnames="w-1/3"
                      onChange={() => null}
                    />
                    <AreaField
                      label={'Description'}
                      classnames="w-4/5"
                      padding_right={'32'}
                      value={description}
                      id="description"
                      disabled={true}
                      layout=""
                      error={''}
                      placeholder="Please inclue any additional remarks here."
                      onChange={() => null}
                    />
                    <Gallery label={'Attachments'} value="" padding_right={'0'} />
                    <hr className="h-[2px] bg-gray-300 border-0 drop-shadow-md"></hr>
                    <div className="grid grid-cols-2 pt-1">
                      <Status label={'Status'} value={status} padding_right={'0'} />
                      <div className="flex flex-col pt-1">
                        {isClosed ? (
                          <ActionRequired
                            label={'Action Required'}
                            padding_right={'32'}
                            alert={false}
                          />
                        ) : (
                          <ActionRequired
                            label={'Action Required'}
                            padding_right={'32'}
                            alert={true}
                          />
                        )}
                        <div className="flex flex-col gap-y-4">
                          {isClosed ? null : isSubmit ? (
                            <ActionButton
                              value={'Rate Ticket'}
                              padding_right={'30'}
                              type=""
                              firstViewState={false}
                              toggle={false}
                              onClick={() =>
                                navigate('/feedbackSurvey', {
                                  state: { formState, isSubmit: false },
                                })
                              }
                            />
                          ) : (
                            <React.Fragment>
                              <ActionButton
                                value={'View Quote'}
                                padding_right={'30'}
                                type=""
                                firstViewState={false}
                                toggle={false}
                                onClick={() =>
                                  navigate('/viewQuote', {
                                    state: { formState, isSubmit: true },
                                  })
                                }
                              />
                              <ActionButton
                                value={'Close Ticket'}
                                padding_right={'30'}
                                type=""
                                firstViewState={false}
                                toggle={false}
                                onClick={handleCloseTicket}
                              />
                            </React.Fragment>
                          )}
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
                <div className="ml-2 w-3/7 flex h-fit bg-form border-gray-200 rounded-lg shadow sm:p-7">
                  <div className="space-y-4">
                    <p className="text-lg text-left font-medium">Landlord Assigned</p>
                    <hr className="h-[1px] bg-gray-300 border-0 drop-shadow-md"></hr>
                    <LineField
                      type={'text'}
                      label="Name"
                      padding_right="65"
                      value={'Mr Smoy'}
                      name="landlord"
                      placeholder={''}
                      error={''}
                      disabled={true}
                      layout=""
                      classnames="w-3/5"
                      onChange={() => null}
                    />
                    <LineField
                      type={'text'}
                      label="Contact"
                      padding_right="50"
                      value={'+65 8766 3211'}
                      name="landlordCtc"
                      placeholder={''}
                      error={''}
                      disabled={true}
                      layout=""
                      classnames="w-3/5"
                      onChange={() => null}
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

export default ViewTicket;
