import React, { ChangeEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';

    const PasswordResetSuccessful = () => {
        //creating variable for navigation
        const navigate = useNavigate();

        // Event handler for clicking on back button
        const handlePageBack = () => {
            navigate('/logintenant')
        };

    return(
        //first div sets background
        <div className="bg-content flex flex-col h-screen justify-center items-center">
            {/*second div sets the card which houses the form */}
            <div className="flex flex-col bg-form border-gray-700 rounded-lg shadow sm:p-5  h-128 w-128">
                <div className = "flex justify-center">
                    <p className= "text-5xl mt-3 text-headerText text-center">Tenant Portal</p>
                </div>
                <div className = "flex flex-col justify-center mt-20">
                    <p className="text-4xl text-headerText text-center">Password Reset</p>
                    <p className="text-4xl text-headerText text-center block">Successful</p>
                    <div className = "mt-4">
                        <button type ="submit" className = "bg-[#335B77] rounded-lg h-12 w-[280px] text-2xl font-bold text-white p-1 mt-2 " onClick = {handlePageBack} >
                            Back
                        </button>
                    </div>
                </div>



            </div>
        </div>
    )

    }

export default PasswordResetSuccessful;
