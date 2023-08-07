import React, { ChangeEvent, FormEvent, useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import LineField from '../components/LineField';
import LandlordNavbar from '../components/LandlordNavbar';
import BackButton from '../components/BackButton';
import SubmitButton from '../components/SubmitButton';
import { AuthContext } from '../contexts/AuthContext';
import { client } from '../client';

const AddService = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [isSubmit, setSubmit] = useState(false);
  const [errors, setErrors] = useState<string | any>({});

  const [formState, setFormState] = useState<string | any>({
    nameService: '',
    //isSubmitted: false
  });

  // const [serviceName, setServiceName] = useState("");

  const { nameService } = formState;

  const handleBack = () => {
    navigate('/LandlordDashboard');
  };

  const handleNameChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLDivElement>
  ): void => {
    if ('value' in event.target) {
      setFormState({
        ...formState,
        [event.target.name]: event.target.value,
      });
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!formState.nameService) {
      errors.nameService = 'Enter Service Provider!';
    } else {
      delete errors.nameService;
    }

    setErrors({ ...errors });

    if (Object.keys(errors).length > 0) {
    } else {
      client
        .service('building')
        .get(user?.buildingId ?? '')
        .then((building) => {
          // Add the new request type to the existing array
          const reqTypes = building.requestTypes;
          reqTypes.push(formState.nameService);
          const buildingUpdated = { requestTypes: reqTypes };
          // console.log(building.requestTypes);
          // building.requestTypes.push(formState.nameService);

          // Patch the building with the updated requestTypes array
          return client.service('building').patch(user?.buildingId ?? '', buildingUpdated);
        })
        .then((updatedBuilding) => {
          console.log('Updated building:', updatedBuilding);
          setSubmit(true);
        })
        .catch((err) => {
          console.error('Error updating building:', err);
        });
    }
  };

  useEffect(() => {
    if (isSubmit) {
      setTimeout(() => {
        navigate('/LandlordDashboard', { state: { formState, isSubmit } });
      }, 5000);
    }
  }, [isSubmit, formState, navigate]);

  return (
    <>
      <div className="flex flex-col h-screen bg-[#ECEDED]">
        <LandlordNavbar />
        <BackButton type="button" label={'home'} handleClick={handleBack} />
        <div className="flex flex-col items-center justify-center">
          <div className="flex flex-col text-left">
            <div className="flex flex-row justify-start">
              <p className="text-headerText text-[#2E424D] pb-5 text-2xl font-medium">
                Add Service
              </p>
            </div>
            <div className="flex w-fit bg-white border-gray-200 rounded-lg shadow sm:p-5 items-center ">
              <form className="space-y-4 mx-auto bg-white">
                <p className="text-lg text-left font-medium">Service Details</p>
                <hr className="h-[1px] bg-gray-300 border-0 drop-shadow-md"></hr>
                <LineField
                  type={'text'}
                  label="Name"
                  padding_right="45"
                  value={nameService}
                  name="nameService"
                  placeholder={'Enter new service'}
                  error={errors.nameService}
                  disabled={false}
                  layout=""
                  classnames="w-3/5"
                  onChange={handleNameChange}
                />

                <div className="flex justify-end">
                  <SubmitButton type="submit" label={'Submit'} handleClick={handleSubmit} />
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
