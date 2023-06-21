import React, {ChangeEvent, FormEvent, useState} from 'react'
import OutputField from '../components/OutputField';
import FormGallery from '../components/FormGallery';

function ViewTicket() {
    var ticket_id = "007";
    var location = "Sunplaza";
    var unit = "01-35";
    var category = "Defects";
    var description= "Lorem ipsum blablabla Lorem ipsum blablabla Lorem ipsum blablabla"

    return (
      <div className="bg-content w-screen h-screen font-3xl " id="content">
        <div id="viewTicket">
            <div>
                <p className='text-headerText pt-12 pb-12 text-2xl font-medium'>Service Ticket #{ticket_id} : {location} Unit {unit}</p>
            </div>
            <div className="mx-auto w-full max-w-fit bg-form border-gray-200 rounded-lg shadow sm:p-6">
                <form className="space-y-6">
                    <p className="text-lg text-left font-medium">Title</p>
                    <hr className="h-px my-8 bg-gray-300 border-0 drop-shadow-md"></hr>
                    <OutputField
                      label={"Category"}
                      value={category}
                      name="description"
                      disabled={true}
                      placeholder='' 
                      padding_right={'48'}/>
                    <OutputField
                        label={"Description"}
                        padding_right={"32"}
                        value={description}
                        name="description"
                        disabled={true}
                        placeholder=''/>
                    <FormGallery
                        label={"Attachments"}
                        value=''
                        padding_right={"0"}/>
                    <hr className="h-px my-8 bg-gray-300 border-0 drop-shadow-md"></hr>
                </form>
            </div>

        </div>
      </div>
    );
  }
  
  export default ViewTicket;