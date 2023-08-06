import LineField from '../components/LineField';
import AttachQuotation from '../components/AttachQuotation';
import LandlordNavbar from '../components/LandlordNavbar';
import BackButton from '../components/BackButton';
import Example_quote from '../images/example_quote.png';
import React, { ChangeEvent, FormEvent, useContext, useEffect, useState } from 'react';
import SubmitButton from '../components/SubmitButton';
import { useNavigate, useLocation } from 'react-router-dom';
import { Ticket } from '../esc-backend/src/client';
import { client } from '../client';
import { AuthContext } from '../contexts/AuthContext';

function UploadQuote() {
  const navigate = useNavigate();
  const locate = useLocation()
  const ticket: Ticket | undefined = locate.state

  const { user } = useContext(AuthContext);

  const [isSubmit, setSubmit] = useState(false);
  const [filenames, setFilenames] = useState('');
  const [errors, setErrors] = useState<string | any>({});
  const [formState, setFormState] = useState<string | any>({
    totalAmount: ticket?.quotation?.amount,
    formRemarks: ticket?.quotation?.remarks,
    formId: ticket?._id,
    formAttachments: ticket?.quotation?.uri || null,
    //isSubmitted: false
  });

  const { totalAmount, formRemarks, formAttachments } = formState;

  const handleRemarksChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLDivElement>
  ): void => {
    event.stopPropagation();
    const target = event.target
    if ('value' in target) {
      setFormState({
        ...formState,
        formRemarks: target.value
      });
    }
  };

  const handleAmountChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLDivElement>
  ): void => {
    const target = event.target;
  
    if ('value' in target) {
      
      setFormState({
        ...formState,
        totalAmount: target.value, // Use target.value instead of target.textContent
      });
    }
  };


  const handleBack = () => {
    navigate('/LandlordViewTicket', {state: ticket});
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>): void => {
    if ('files' in event.target) {
      if (event.target.files) {
        setFormState({
          ...formState,
          [event.target.name]: event.target.files[0],
        });
        setFilenames(event.target.files[0].name);
      }
    }
  };

  const [noQuotationNeeded, setNoQuotationNeeded] = useState(false);

  const handleCheckBoxChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setNoQuotationNeeded(event.target.checked);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!noQuotationNeeded && !formState.totalAmount) {
      errors.formTotalAmount = 'Enter a Amount!';
      errors.formAttachments = 'Attach Quotation File!'
      errors.formRemarks = ''
    } else {
      delete errors.formTotalAmount;
      delete errors.formAttachments;
      delete errors.formRemarks;
    }

    setErrors({ ...errors });

    if (Object.keys(errors).length > 0) {
      console.log('Failed');
      console.log(errors);
      console.log(formState);
    } else {
      
      console.log(ticket?.status)
      console.log(user?.typ)
      console.log(user?._id == ticket?.personnelAssigned)

      console.log(formState); 

      const quotation = new FormData();
      quotation.set('ticketId', (ticket?._id?? 0).toString());
      quotation.set('remarks', formState.formRemarks);
      quotation.set('amount', formState.totalAmount);
      quotation.set('uri', formState.formAttachments);

      await client.service('ticket').uploadQuotation(quotation as any, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      console.log("This is after.then: " + formState);
      console.log('Success');
      setSubmit(true);
    }
  };

   // Will redirect to home/dashboard after 5 seconds
   useEffect(() => {
    if (isSubmit) {
      let redirect = '/LandlordDashboard';
    navigate('/Success', {state: {redirect, formState, isSubmit }});
    }
  }, [isSubmit, formState, navigate]);
  

  // Mock static values
  var quotationby = user?._id?? '';

  const [iframeSrc, setIframeSrc] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (formAttachments) {
      console.log(formAttachments);
      setIframeSrc(URL.createObjectURL(formAttachments)); // Use the first attachment URL as iframe src
    } else if (ticket?.quotation?.uri) {
      // Use the URI from the ticket if available (when editing existing quote)
      setIframeSrc(`http://localhost:3030/${ticket?.quotation?.uri}`);
    } else {
      // Set to undefined when there are no attachments or ticket URI
      setIframeSrc(undefined);
    }
  }, [formAttachments, ticket]);

  return (
    <div className="flex flex-col h-screen bg-[#ECEDED]">
      <LandlordNavbar />
      <div className="flex flex-col font-3xl" id="viewTicket">
        <BackButton type="button" label={'view ticket'} handleClick={handleBack} />
        <div className="flex-grow flex flex-col justify-center items-center bg-[#ECEDED]">
          <p className="text-headerText pb-5 text-2xl font-medium">New Quotation</p>
        </div>
        <div className="flex mx-auto my-auto w-2/4 bg-white border-gray-200 rounded-lg shadow sm:p-7">
          <div className="grid grid-cols-2 w-fit">
            <form onSubmit={handleSubmit} className="space-y-5">
              <p className="text-lg text-center font-medium h-5">New Request Form</p>
              <hr className="h-[1px] bg-gray-300 border-0 drop-shadow-md"></hr>
              <div className="grid grid-cols-2 gap-x-10">
                <LineField
                  type={'text'}
                  label="Quotation By"
                  classnames=""
                  padding_right="0"
                  value={quotationby}
                  name="name"
                  placeholder={''}
                  error=""
                  disabled={true}
                  layout={'vertical'}
                  onChange={() => null}
                />
                <LineField
                  type={'text'}
                  label="Remarks"
                  classnames="w-4/5"
                  padding_right="0"
                  value={formRemarks}
                  name="formRemarks"
                  placeholder={'remarks'}
                  error={errors.formRemarks}
                  disabled={false}
                  layout={'vertical'}
                  onChange={handleRemarksChange}
                />
              </div>
              <LineField
                type={'text'}
                label="Total Amount (SGD)"
                classnames="w-3/4"
                padding_right="0"
                value={totalAmount}
                name="totalAmount"
                placeholder={'Please key in amount'}
                error={errors.formTotalAmount}
                disabled={false}
                layout={'vertical'}
                onChange={handleAmountChange}
              />
            </form>
            <div className="border-l-2 border-gray-300 items-center bg-[white]">
              <div className="flex flex-col items-center bg-[white]">
                <p className="text-lg text-left font-medium text-headerText text-center">
                  Document View
                </p>
                <hr className="h-[1px] bg-gray-300 border-0 drop-shadow-md"></hr>
                {/* <img
                  src={Example_quote}
                  className="flex mx-auto mt-3 h-4/5 w-2/3"
                  alt="Quote PDF"
                /> */}
            <div className='flex flex-col items-center w-full'>
              {iframeSrc && (
                 <iframe src={iframeSrc} title="Quotation Document" className="flex mx-auto mt-3 w-2/3" />
              )}
                <div style={{ paddingBottom: 100 + 'px' }} className="flex flex-col items-center">
                  <AttachQuotation
                    label="Add Attachments"
                    name="formAttachments"
                    padding_left="0"
                    filenames={filenames}
                    value={formAttachments}
                    error={errors.formAttachments}
                    disabled={false}
                    onChange={handleFileChange}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-x-10">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="noQuotation"
                    checked={noQuotationNeeded}
                    onChange={handleCheckBoxChange}
                  />
                  <label htmlFor="noQuotation" className="ml-2">
                    No need quotation
                  </label>
                </div>
                <div className="flex justify-end">
                
                  <SubmitButton type="submit" label={'Submit'} handleClick={handleSubmit} />
                
                </div>
              </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UploadQuote;