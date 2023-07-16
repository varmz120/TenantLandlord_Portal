import React, { MouseEvent, ChangeEvent, FormEvent, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import LineField from '../components/LineField';
import ActionButton from '../components/ActionButton';
import SubmitButton from './SubmitButton';
import AreaField from './AreaField';

const handleSubmit = (event: FormEvent<HTMLFormElement>) => {};

const BuildingDetailsForm = () => {
  const [firstView, setFirstView] = useState(true);
  const [isClosed, setClosed] = useState(false);

  const [isSubmit, setSubmit] = useState(false);
  const [filenames, setFilenames] = useState<string[]>([]);
  const [errors, setErrors] = useState<string | any>({});

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

  let buildingId;

  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen ">
        <div className="flex flex-col text-left">
          <div className="flex w-fit bg-form border-gray-200 rounded-lg shadow sm:p-5 items-center ">
            <form className="space-y-4 mx-auto ">
              <div>
                <p className="text-lg text-left font-medium">Building Deatails</p>
              </div>
              <hr className="h-[1px] bg-gray-300 border-0 drop-shadow-md"></hr>
              <p className="text-lg text-left font-medium">Account Details</p>
              <LineField
                type={'text'}
                label="Name"
                padding_right="66.5"
                value=""
                name="category"
                placeholder={''}
                error={''}
                disabled={true}
                layout=""
                classnames=""
                onChange={() => null}
              />
              <AreaField
                label={'Address'}
                classnames="w-4/5"
                padding_right={'51.25'}
                value=""
                id="description"
                disabled={true}
                layout=""
                error={''}
                placeholder="Please inclue any additional remarks here."
                onChange={() => null}
              />
              <LineField
                type={'text'}
                label="Postal Code"
                padding_right="20"
                value=""
                name="category"
                placeholder={''}
                error={''}
                disabled={true}
                layout=""
                classnames=""
                onChange={() => null}
              />

              <div className="flex justify-end">
                <SubmitButton type="submit" label="Submit" handleClick={handleSubmit} />
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default BuildingDetailsForm;
