import React, {ChangeEvent, FormEvent, useState} from 'react'
import FormField from '../components/FormField';

function FormExample() {
    var ticket_id = "007";
    var location = "Sunplaza";
    var unit = "01-35";
    const [name, setName] = useState('');
    const [active, setActive] = useState(false);
    const [error, setError] = useState(false);

    const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!name.trim()) {
            setError(true)
        } else {
            setError(false)
        }
    }
    return (
      <div className="bg-content w-full h-full font-3xl " id="content">
        <div id="viewTicket">
            <div>
                <p className='text-headerText pt-12 pb-12 text-2xl font-semibold'>Service Ticket #{ticket_id} : {location} Unit {unit}</p>
            </div>
            <div className="w-full max-w-sm p-4 bg-form border border-gray-200 rounded-lg shadow sm:p-6 md:p-8">
                <form className="space-y-6" onSubmit={handleSubmit}>
                    <h5 className="text-xl font-semibold">Title</h5>
                    <FormField
                        type="text"
                        label="Name"
                        value={name}
                        name="name"
                        error={error}
                        onChange={handleNameChange}
                        placeholder='Please enter your name'/>
                    {/* <div>
                        <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                        <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="name@company.com" required>
                    </div>
                    <div class="flex items-start">
                        <div class="flex items-start">
                            <div class="flex items-center h-5">
                                <input id="remember" type="checkbox" value="" class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" required>
                            </div>
                            <label for="remember" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Remember me</label>
                    </div> */}
                <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">View Quote</button>
                </form>
            </div>

        </div>
      </div>
    );
  }
  
  export default FormExample;