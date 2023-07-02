import BackButton from '../components/BackButton';
import ActionButton from '../components/ActionButton';
import StarRating from '../components/StarRating';
import AreaField from '../components/AreaField';
import TermsConditionsCheckbox from '../components/TermsConditionsCheckbox';
import SubmitButton from '../components/SubmitButton';
import UploadField from '../components/UploadField';
import React, {MouseEvent, ChangeEvent, FormEvent, useState, useEffect} from 'react'

function RateTicket() {
  const [firstView, setFirstView] = useState(true);
  const [isClosed, setClosed] = useState(false);
  const [formState, setFormState] = useState<string | any>({
    formRating: 0,
    formRemarks: "",
    formAcknowledgement: false,
    formAttachments: [],
    isSubmitted: false
  });
  const [filenames, setFilenames] = useState<string[]>([]);
  const [errors, setErrors] = useState<string | any>({});

  const handleButtonClick = (event: MouseEvent<HTMLButtonElement>) : void => {
    event.stopPropagation();
    setFirstView(false);
    if ('name' in event.target){
      let closed = false;
      if (event.target.name === 'accept') {
        closed = true;
      }
      setClosed(closed);
    }
  };

  // // For testing purpose
  // useEffect(()=> {
  //   console.log('Current button press', isClosed);
  // }, [isClosed]);

  const handleCheckedChange = (event: ChangeEvent<HTMLInputElement>) : void => {
    if ('checked' in event.target) {
      setFormState({
        ...formState,
        [event.target.name]: event.target.checked
      });
    }
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) : void => {
    if ('files' in event.target) {
      const data : string[] = [];
      const names : string[] = [];
      if (!event.target.files || event.target.files.length === 0) {
        console.log("Select a file");
      } else {
        for (let i=0; i < event.target.files.length; i++) {
          data.push(URL.createObjectURL(event.target.files[i]));
          names.push(event.target.files[i].name);
        }
      const updatedAttachments = formState["formAttachments"].concat(data);
      setFormState({
        ...formState,
        [event.target.name]: updatedAttachments
      });
      setFilenames(names);
      }
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isClosed) {
      if (!formState.formRating) {
        errors.formRating = "Enter a rating!";
      } else {
        delete errors.formRating;
      }
      if (!formState.formAcknowledgement) {
        errors.formAcknowledgement = "Please accept the T&C!"
      } else {
        delete errors.formAcknowledgement;
      }
    } else {
      if (!formState.formRemarks) {
        errors.formRemarks = "Please list your concerns below.";
      } else {
        delete errors.formRemarks;
      }
    }
    setErrors({...errors});

    if (Object.keys(errors).length > 0) {
      console.log("Failed");
      console.log(errors);
      console.log(formState);
    } else {
      setFormState({
        ...formState,
        isSubmitted: true
      });
      console.log("Success");
      console.log(formState);
    }
  };

  // Mock static values
  var ticket_id = "007";
  var location = "Sunplaza";
  var unit = "01-35";

  const {
    formRating,
    formRemarks, 
    formAcknowledgement,
    formAttachments
  } = formState;

  return (
    <div className="flex flex-col font-3xl" id="viewTicket">
            <BackButton
              type="button"
              label={"all tickets"}
              handleClick={()=>null}
              layout=''/>
            <div className='flex justify-center'>
                <p className='text-headerText pb-5 text-2xl font-medium'>Service Ticket #{ticket_id} : {location} Unit {unit}</p>
            </div>
            <div className="flex mx-auto w-fit bg-form border-gray-200 rounded-lg shadow sm:p-7">
                <form className="space-y-4">
                    <p className="text-lg text-left font-medium">Title</p>
                    <hr className="h-[1px] bg-gray-300 border-0 drop-shadow-md"></hr>
                    <div className='flex align-center text-left'>
                      <p className='text-userNameText'>Do you wish to close the ticket and confirm completion of service?</p>
                    </div>
                    <div className='flex flex-row gap-x-5'>
                      <ActionButton
                        value={"Yes"}
                        padding_right={"0"}
                        type="accept"
                        toggle={isClosed}
                        firstViewState={firstView}
                        onClick={handleButtonClick}/>
                      <ActionButton
                        value={"No"}
                        padding_right={"0"}
                        type="reject"
                        toggle={!isClosed}
                        firstViewState={firstView}
                        onClick={handleButtonClick}/>
                    </div>
                    { firstView ? 
                      (null) :
                    isClosed ? (
                    <React.Fragment>
                    <StarRating 
                      label={"Rating"}
                      padding_right='24'
                      handleClick={()=>null}/>
                    <AreaField
                      label={"Additional Remarks"}
                      classnames="w-4/5"
                      padding_right={"0"}
                      value={formRemarks}
                      id="formRemarks"
                      disabled={false}
                      layout={"vertical"}
                      placeholder="Please inclue any additional remarks here."
                      onChange={()=>null}/>
                    <TermsConditionsCheckbox
                      link={"#"}
                      label="Acnowledgement of T&C"
                      padding_right="0"
                      value={formAcknowledgement}
                      name="formAcknowledgement"
                      error={""}
                      disabled={false}
                      onChange={handleCheckedChange}/>
                    <SubmitButton
                      type="submit"
                      label="Submit"
                      handleClick={handleSubmit}/>
                    </React.Fragment>
                    ) : (
                    <React.Fragment>
                    <AreaField
                      label={"Reasons for reopening of service ticket"}
                      classnames=""
                      padding_right={"0"}
                      value={formRemarks}
                      id="formRemarks"
                      disabled={false}
                      layout={"vertical"}
                      placeholder="Please inclue any additional remarks here."
                      onChange={()=>null}/>
                    <UploadField
                      label="Add Attachments"
                      name="formAttachments"
                      padding_right="0"
                      filenames={filenames}
                      value={formAttachments}
                      error={errors.formAttachments}
                      disabled={false}
                      onChange={handleFileChange}/>
                    <SubmitButton
                      type="submit"
                      label="Submit"
                      handleClick={handleSubmit}/>
                    </React.Fragment>
                    )}
                </form>
            </div>
      </div>
    );
  }
  
  export default RateTicket;