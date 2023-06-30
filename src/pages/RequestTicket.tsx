import AreaField from '../components/AreaField';
import LineField from '../components/LineField';
import DropdownField from '../components/DropdownField';
import UploadField from '../components/UploadField';
import TermsConditionsCheckbox from '../components/TermsConditionsCheckbox';
import SubmitButton from '../components/SubmitButton';

function RequestTicket() {
  // Mock static values
  var area = 'General Queries';
  var contactNo = '+65 9123 4567';
  var email = "dianmaisara@gmail.com";
  var userCtc = '+65 9874 2311';
  var categories = ["Cleanliness", "Aircon Extension", "Repair", "Pest Control"] 

  return (
    <div className="flex flex-col w-full items-center" id="requestTicket">
      <div className="flex bg-white/70 px-10 my-3">
        <p className='text-sm flex flex-col text-black font-base py-1'>
          <span>For {area}, please refer to the Frequently Asked Questions FAQ Page <a href="#" className="underline">
           here </a></span>
          <span>In case of emergencies, please contact us at {contactNo}</span>
        </p>
      </div>
      <div className="flex bg-form border-gray-200 rounded-lg shadow sm:p-5">
        <form onSubmit={()=>null} className="space-y-5">
          <p className="text-lg text-center font-medium h-5">New Request Form</p>
          <hr className="h-[1px] bg-gray-300 border-0 drop-shadow-md"></hr>
          <div className="grid grid-cols-2 gap-x-10">
            <LineField
              type={"text"}
              label="Email"
              classnames=""
              padding_right="0"
              value={email}
              name="name"
              placeholder={""}
              error=""
              disabled={true}
              layout={"vertical"}
              onChange={()=> null}/>
            <LineField
              type={"text"}
              label="Contact"
              classnames="w-4/5"
              padding_right="0"
              value={userCtc}
              name="userCtc"
              placeholder={""}
              error=""
              disabled={true}
              layout={"vertical"}
              onChange={()=> null}/>
          </div>
          <LineField
            type={"text"}
            label="Title"
            classnames="w-3/4"
            padding_right="0"
            value={""}
            name="formTitle"
            placeholder={"Please type in a title"}
            error={""}
            disabled={false}
            layout={"vertical"}
            onChange={()=>null}/>
          <DropdownField
            type={"text"}
            label="Category"
            classnames="w-1/4"
            padding_right="0"
            value={""}
            name="formCategory"
            error={""}
            disabled={false}
            layout={"vertical"}
            options={categories}
            onChange={()=>null}/>
          <AreaField
            label={"Description"}
            classnames=""
            padding_right={"0"}
            value={""}
            id="formDescription"
            disabled={false}
            layout={"vertical"}
            placeholder="Please inclue any additional remarks here."
            onChange={()=>null}/>
          <UploadField
            label="Add Attachments"
            name="formAttachments"
            padding_right="0"
            filenames={[]}
            value={""}
            error={""}
            disabled={false}
            onChange={()=>null}/>
          <TermsConditionsCheckbox
            link={"#"}
            label="Acnowledgement of T&C"
            padding_right="0"
            value={false}
            name=""
            error={""}
            disabled={false}
            onChange={()=>null}/>
          <SubmitButton
            type="submit"
            label="Submit"
            handleClick={()=>null}
            />
        </form>
      </div>
    </div>
  );
}

export default RequestTicket;