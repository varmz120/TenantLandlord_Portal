import React, { MouseEvent, ChangeEvent, FormEvent, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import LineField from '../components/LineField';
import Navbar from '../components/Navbar';
import BackButton from '../components/BackButton';
import SubmitButton from '../components/SubmitButton';

const AddService = () => {
  const [firstView, setFirstView] = useState(true);
  const [isClosed, setClosed] = useState(false);

  const [isSubmit, setSubmit] = useState(false);
  const [filenames, setFilenames] = useState<string[]>([]);
  const [errors, setErrors] = useState<string | any>({});

  const [formState, setFormState] = useState<string | any>({
    nameService: "",
    //isSubmitted: false
  });

  const handleButtonClick = (event: MouseEvent<HTMLButtonElement>): void => {
    event.stopPropagation();
    setFirstView(false);
    if ('name' in event.target) {
      let closed = false;
      if (event.target.name === 'accept') {
        closed = true;
      }
      setClosed(closed);
    }
  };

  const handleValueChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLDivElement>) : void => {
    if ('value' in event.target) {
      setFormState({
        ...formState,
        [event.target.name]: event.target.value
      });
    }
  };

  return (
    <>
    <div className="flex flex-col h-screen bg-[#ECEDED]">
    <Navbar />
    <BackButton
              type="button"
              label={"home"}
              handleClick={()=>null}/>
      <div className="flex flex-col items-center justify-center">
        <div className="flex flex-col text-left">
          <div className="flex flex-row justify-start">
            <p className="text-headerText text-[#2E424D] pb-5 text-2xl font-medium">Add Service</p>
          </div>
          <div className="flex w-fit bg-white border-gray-200 rounded-lg shadow sm:p-5 items-center ">
            <form className="space-y-4 mx-auto bg-white">
              <p className="text-lg text-left font-medium">Service Details</p>
              <hr className="h-[1px] bg-gray-300 border-0 drop-shadow-md"></hr>
              <LineField
                type={'text'}
                label="Name"
                padding_right="45"
                value="Bobby"
                name="name"
                placeholder={''}
                error={''}
                disabled={true}
                layout=""
                classnames="w-3/5"
                onChange={() => null}
              />
              <div className='flex justify-end'>
              <SubmitButton type="submit" label={'Submit'} handleClick={''} />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default AddService;