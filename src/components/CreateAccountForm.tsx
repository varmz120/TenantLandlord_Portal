import React, { MouseEvent, ChangeEvent, FormEvent, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import LineField from '../components/LineField';
import ActionButton from '../components/ActionButton';
import SubmitButton from './SubmitButton';
import DeleteIcon from '../images/delete.svg';

interface Props {
  userType: string;
  handleDelClick: () => void;
}
const handleSubmit = (event: FormEvent<HTMLFormElement>) => {};

const CreateAccountForm = ({ userType, handleDelClick }: Props) => {
  const [email, setEmail] = useState('');
  const [buildingID, setBuildingID] = useState('');
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
  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const newValue = event.target.value;
    setEmail(newValue);
  };

  const handleBuildingChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const newValue = event.target.value;
    setBuildingID(newValue);
  };

  let buildingId;

  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen drop-shadow-2xl ">
        <div className="flex flex-col text-left">
          <div className="flex w-fit bg-form border-gray-200 rounded-lg shadow sm:p-5 items-center ">
            <form className="space-y-4 mx-auto ">
              <div className="flex flex-row">
                <p className="text-lg text-left font-medium pr-64">{userType}</p>
                <a href="#" onClick={handleDelClick}>
                  <img src={DeleteIcon} alt="" className="w-4" />
                </a>
              </div>
              <hr className="h-[1px] bg-gray-300 border-0 drop-shadow-md"></hr>
              <p className="text-lg text-left font-medium">Account Details</p>

              <LineField
                type={'text'}
                label="Email"
                padding_right="65.5"
                value={email}
                name="category"
                placeholder={'some email'}
                error={''}
                disabled={false}
                layout=""
                classnames=""
                onChange={handleEmailChange}
              />
              {(userType == 'Landlord' || userType == 'Service Provider') && (
                <LineField
                  type="text"
                  label="Building ID"
                  padding_right="20"
                  value={buildingID}
                  name="category"
                  placeholder=""
                  error=""
                  disabled={false}
                  layout=""
                  classnames=""
                  onChange={handleBuildingChange}
                />
              )}

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

export default CreateAccountForm;
