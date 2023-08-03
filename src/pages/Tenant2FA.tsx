import React, { useContext, useEffect, useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import SubmitButton from '../components/SubmitButton';
import { client } from '../client';

const Tenant2FA = () => {
  // Navigation & routing
  const navigate = useNavigate();

  // Context
  const { user, temp_details, login, logout, tempLogin } = useContext(AuthContext);

  // Creating state variables for username and password

  // Creating state variables for authentication
  const [auth, setAuth] = useState('');

  // Event handler for change in authentication code field
  const handleAuthentication = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAuth(event.target.value);
  };

  // Event handler for clicking on the verify button
  const handleVerifyClick = async (event: FormEvent<HTMLFormElement>) => {

    console.log('user before update: ', temp_details);
    // TODO: Auth here.
    await client.get2FA({
      strategy: 'local',
      _id: temp_details!.id,
      password: temp_details!.password,
      code: parseInt(auth),
    });

    let result = await client.service('users').get(String(temp_details?.id))
    console.log(result._id);
    console.log(result.typ);
    
    login({
      id: String(result?._id),
      password: String(temp_details?.password),
      email: String(result?.email),
      typ: Number(result?.typ),
    });
  };
  
  useEffect(() => {
    if (auth !== null) {
      if (user !== null) {
    
        console.log('User is not null');
        console.log(user?.typ);
        
        if (user?.typ == 0) {
          console.log('User is a tenant');
          let redirect = '/tenantDashboard';
          navigate('/Success', { state: { redirect } });
        }
        else if (user?.typ == 1) {
          console.log('User is a landlord');
          let redirect = '/ServProvDashboard';
          navigate('/Success', { state: { redirect } });
        }
        else if (user?.typ == 2) {
          console.log('User is a landlord');
          let redirect = '/landlordDashboard';
          navigate('/Success', { state: { redirect } });
        }
         else if (user?.typ == 3) {
          console.log('User is a admin');
          let redirect = '/adminDashboard';
          navigate('/Success', { state: { redirect } });
        } else {
          navigate('/401');
        }
      }
      else {
        console.log('User is null');
      }
    } else {
      console.log('Invalid authentication code');
    }
  }, [user, auth, navigate]);


  return (
    //first div sets background
    <div className="bg-content flex flex-col h-screen justify-center items-center">
      {/*second div sets the card which houses the form */}
      <div className="relative flex bg-form border-gray-700 rounded-lg shadow sm:p-5  h-128 w-128 justify-center items-start">
        {/*two factor authentication form below */}
        <form className="flex flex-col justify-start w-full p-4">
          <p className="text-5xl my-3 text-headerText">Tenant Portal</p>
          <p className="text-3xl text-start mt-10 mr-1 text-headerText">Two-Factor</p>
          <p className="text-3xl text-start mb-1 text-headerText block">Authentication</p>

          <input
            className={
              'my-2 text-headerText bg-inputField disabled:bg-disabledField disabled:text-disabledText font-light rounded pl-2 py-1 px-5 focus:outline-none focus:border-sky-500 focus:ring-1 focus:bg-userNameButton focus:ring-sky-500 focus:caret-sky-500 invalid:border-pink-500 invalid:text-pink-600 invalid:caret-pink-500 focus:invalid:border-pink-500 focus:invalid:ring-pink-500 focus:invalid:caret-pink-500'
            }
            value={auth}
            onChange={handleAuthentication}
            placeholder="Enter authentication code"
          />

          <p className="mb-10"></p>
          <SubmitButton type="button" label="Submit" handleClick={handleVerifyClick} />
        </form>
      </div>
    </div>
  );
};

export default Tenant2FA;
