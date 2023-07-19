import React, { MouseEvent, ChangeEvent, FormEvent, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import LineField from '../components/LineField';
import Navbar from '../components/Navbar';
import BackButton from '../components/BackButton';
import SearchBldgField from '../components/SearchBldgField';
import SearchTenantField from '../components/SearchTenantField'
import CommencementExpiry from '../components/CommencementExpiry'
import AddTenantButton from '../components/AddTenantButton';
import AddBldgButton from '../components/AddBldgButton';
import SubmitButton from '../components/SubmitButton';
import TenantDetails from '../components/TenantDetails';

const AddLease = () => {
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

  const [initialRender, setInitialRender] = useState(true);

  const [isClicked, setClicked] = useState(false);

  const handleDeleteClick = () => {
    setClicked(false);
  };

  return (
    <>
     <div className="flex flex-col h-screen bg-[#ECEDED]">
      <Navbar />
      <BackButton
              type="button"
              label={"home"}
              handleClick={()=>null}/>
      <div className="flex flex-col items-center justify-center h-screen ">
        <div className="flex flex-col text-left">
          <div className="flex flex-row justify-start">
            <p className="text-headerText text-[#2E424D] pb-5 text-2xl font-medium">Add Lease</p>
          </div>
          <div className="flex w-fit bg-white border-gray-200 rounded-lg shadow sm:p-5 items-center ">
            <form className="space-y-4 mx-auto bg-white">
              <p className="text-lg text-left font-medium">Lease Details</p>
              <hr className="h-[1px] bg-gray-300 border-0 drop-shadow-md"></hr>
              <LineField
                type={'text'}
                label="User ID"
                padding_right="85"
                value="T45326901"
                name="userID"
                placeholder={''}
                error={''}
                disabled={false}
                layout=""
                classnames=""
                onChange={() => null}
              />
              <LineField
                type={'text'}
                label="Email"
                padding_right="100"
                value="Bob@gmail.com"
                name="email"
                placeholder={''}
                error={''}
                disabled={false}
                layout=""
                classnames=""
                onChange={() => null}
              />

              <div className='flex flex-center'>
              <SearchTenantField type={'text'} layout={''}/>
              <div>
              <AddTenantButton type='submit' label={'+ Create New Tenant'} handleClick={() => setClicked(true)}></AddTenantButton>
              </div>
              </div>
    
              <LineField
                type={'text'}
                label="Unit(s)"
                padding_right="90"
                value="#03-142"
                name="unit"
                placeholder={''}
                error={''}
                disabled={false}
                layout=""
                classnames=""
                onChange={() => null}
              />
              
              <div className='flex flex-center'>
              <SearchBldgField type={'text'} layout={''}/>
              <div>
              <AddBldgButton type='submit' label={'+ Add Building'} handleClick={''}></AddBldgButton>
              </div>
              </div>

              <LineField
                type={'text'}
                label="Monthly Rent"
                padding_right="45"
                value="$2000.00"
                name="monthlyrent"
                placeholder={''}
                error={''}
                disabled={false}
                layout=""
                classnames=""
                onChange={() => null}
              />

              <hr className="h-[1px] bg-gray-300 border-0 drop-shadow-md"></hr>
              <CommencementExpiry type={'text'} label1='Commencement' label2='Expiry' padding_right='45' value='06/06/2023' name='commencement' placeholder={''} error={''} layout={''} classnames={''} onChange={() => null}
              />
              <SubmitButton type='submit' label={'Submit'} handleClick={''}></SubmitButton>
            </form>
          </div>
        </div>
      </div>
    </div>
    <div className="absolute top-4 right-64">
        {isClicked && (
          <TenantDetails
            handleDelClick={handleDeleteClick}
          />
        )}
      </div>
    </>
  );
};

export default AddLease;
