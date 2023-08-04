import LineField from '../components/LineField';
import AttachQuotation from '../components/AttachQuotation';
import LandlordNavbar from '../components/LandlordNavbar';
import BackButton from '../components/BackButton';
import Example_quote from '../images/example_quote.png';
import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import SubmitButton from '../components/SubmitButton';
import { useNavigate, useLocation } from 'react-router-dom';
import { Ticket } from '../esc-backend/src/client';
import { client } from '../client';

function UploadQuote() {
  const navigate = useNavigate();
  const locate = useLocation()
  const ticket: Ticket | undefined = locate.state

  const [formState, setFormState] = useState<string | any>({
    totalAmount: '',
    formAttachments: [],
    //isSubmitted: false
  });
  const [isSubmit, setSubmit] = useState(false);
  const [filenames, setFilenames] = useState<string[]>([]);
  const [errors, setErrors] = useState<string | any>({});

  const handleValueChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLDivElement>
  ): void => {
    if ('value' in event.target) {
      setFormState({
        ...formState,
        [event.target.name]: event.target.value,
      });
    }
  };

  const handleBack = () => {
    navigate('/LandlordViewTicket');
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>): void => {
    if ('files' in event.target) {
      const data: string[] = [];
      const names: string[] = [];
      if (!event.target.files || event.target.files.length === 0) {
        console.log('Select a file');
      } else {
        for (let i = 0; i < event.target.files.length; i++) {
          data.push(URL.createObjectURL(event.target.files[i]));
          names.push(event.target.files[i].name);
        }
        const updatedAttachments = formState['formAttachments'].concat(data);
        setFormState({
          ...formState,
          [event.target.name]: updatedAttachments,
        });
        setFilenames(names);
      }
    }
  };

  const [noQuotationNeeded, setNoQuotationNeeded] = useState(false);

  const handleCheckBoxChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setNoQuotationNeeded(event.target.checked);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!noQuotationNeeded && !formState.totalAmount) {
      errors.formTotalAmount = 'Enter a Amount!';
      errors.formAttachments = 'Attach Quotation File!'
    } else {
      delete errors.formTotalAmount;
      delete errors.formAttachments;
      navigate('/LandlordViewTicket');
    }

    setErrors({ ...errors });

    if (Object.keys(errors).length > 0) {
      console.log('Failed');
      console.log(errors);
      console.log(formState);
    } else {
      const form = new FormData();
      form.set('amount', formState.totalAmount)
      form.set('ticketId', '888')
      form.set('remarks', 'test remark')
      form.set('uri', 'wegfgeik')
      for (const attachment of formAttachments) {
        form.append('attachments', attachment);
      }
      client.service('ticket').uploadQuotation(form as any, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(() => {
        setSubmit(true);
      console.log('Success');
      });
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
  var quotationby = 'Tom';
  var date = '06/06/2023';

  const { totalAmount, formAttachments } = formState;

  // const handleGiveQuotation = (event: MouseEvent<HTMLButtonElement>): void => {
  //   client.service('ticket').uploadQuotation({
  //     ticketId: ticket?._id ?? 0,
  //     uri: '',
  //     amount: totalAmount,
  //     remarks: ''
  //   })
  //   .then(() => navigate('/LandlordViewTicket', {state: ticket}));
  // };

  const [iframeSrc, setIframeSrc] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (formAttachments.length > 0) {
      setIframeSrc(formAttachments[0]); // Use the first attachment URL as iframe src
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
        <div className="flex mx-auto my-auto w-4/5 bg-white border-gray-200 rounded-lg shadow sm:p-7">
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
                  label="Date"
                  classnames="w-4/5"
                  padding_right="0"
                  value={date}
                  name="date"
                  placeholder={''}
                  error=""
                  disabled={true}
                  layout={'vertical'}
                  onChange={() => null}
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
                onChange={handleValueChange}
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
            <div className='flex flex-col items-center'>
              {iframeSrc && (
                 <iframe src={iframeSrc} title="Quotation Document" className="flex mx-auto mt-3 h-4/5 w-1/3" />
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
