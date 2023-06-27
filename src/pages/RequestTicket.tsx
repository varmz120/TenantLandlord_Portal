import AreaField from '../components/AreaField';
import LineField from '../components/LineField';
import Gallery from '../components/Gallery';
import Status from '../components/Status';
import ActionRequired from '../components/ActionRequired';
import DropdownField from '../components/DropdownField';
import UploadField from '../components/UploadField';
import TermsConditionsCheckbox from '../components/TermsConditionsCheckbox';
import SubmitButton from '../components/SubmitButton';

function RequestTicket() {
  // Mock static values
  var area = 'General Queries';
  var contactNo = '+65 9123 4567';
  var ticket_id = "007";
  var location = "Sunplaza";
  var unit = "01-35";
  var category = "Defects";
  var email = "dianmaisara@gmail.com"
  var description= "Lorem ipsum blablabla Lorem ipsum blablabla Lorem ipsum blablabla"
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
              error={false}
              disabled={true}
              layout={"vertical"}
              onChange={()=> null}/>
            <LineField
              type={"text"}
              label="Contact"
              classnames="w-4/5"
              padding_right="0"
              value={contactNo}
              name="contactNo"
              placeholder={""}
              error={false}
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
            name="form_title"
            placeholder={"Please type in a title"}
            error={false}
            disabled={false}
            layout={"vertical"}
            onChange={()=>null}/>
          <DropdownField
            type={"text"}
            label="Category"
            classnames="w-1/4"
            padding_right="0"
            value={""}
            name="form_category"
            error={false}
            disabled={false}
            layout={"vertical"}
            options={categories}
            onChange={()=>null}/>
          <AreaField
            label={"Description"}
            classnames=""
            padding_right={"0"}
            value=""
            id="form_description"
            disabled={false}
            layout={"vertical"}
            placeholder="Please inclue any additional remarks here."
            onInput={()=>null}/>
          <UploadField
            type={"file"}
            label="Add Attachments"
            padding_right="0"
            value=""
            name="title"
            placeholder={""}
            error={false}
            disabled={false}
            onChange={()=> null}/>
          <TermsConditionsCheckbox
            link={"#"}
            label="Acnowledgement of T&C"
            padding_right="0"
            value={false}
            name="acknowledgement"
            error={false}
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