import AreaField from '../components/AreaField';
import LineField from '../components/LineField';
import Gallery from '../components/Gallery';
import Status from '../components/Status';
import ActionRequired from '../components/ActionRequired';
import DropdownField from '../components/DropdownField';
import UploadField from '../components/UploadField';
import TermsConditionsCheckbox from '../components/TermsConditionsCheckbox';
import SubmitButton from '../components/SubmitButton';
import React, {ChangeEvent, FormEvent} from 'react'

// GO TO https://css-tricks.com/demonstrating-reusable-react-components-in-a-form/

class TestFlow extends React.Component {
  state : {[key: string]: any} = {
    form: {
      form_title: "",
      form_category: "",
      form_description: "",
      acknowledgement: false
    },
    errors: {},
    submitted: false
  };

  handleChange = (event : ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLDivElement>) : void => { // : void
    console.log("Handling...");
    const { form } = this.state;

    if ('checked' in event.target) {
      form[event.target.name] = event.target.checked;
    }
    if ('value' in event.target) {
      form[event.target.name] = event.target.value;
    }
    if ('textContent' in event.target) {
      form[event.target.id] = event.target.textContent;
    }
    console.log(this.state);
    this.setState({ form });
    console.log("At end of handling");
  };

  handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    console.log("Submitting...");
    console.log(this.state);
    const {
      form: { form_title, form_category, form_description, acknowledgement }
    } = this.state;
    let err : {[key: string]: any} = {};

    if (!form_title) {
      err.form_title = "Enter a title!";
    }

    if (!form_category) {
      err.form_category = "Please pick a category.";
    }

    if (!acknowledgement) {
      err.acknowledgement = "Please accept the T&C!";
    }

    this.setState({ errors : err }, () => {
      console.log(this.state);
      if (Object.getOwnPropertyNames(this.state.errors).length === 0) {
        this.setState({ submitted: true });
        console.log("Success");
      } else {
        console.log("Failed");
        console.log(this.state);
      }
    });
  };

  render(){
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

  const {
    submitted,
    errors,
    form: {form_title, form_category, form_description, acknowledgement}
  } = this.state;
  return (
    <React.Fragment>
    {submitted ? (
      <React.Fragment>
        <p>Yay! {form_title} has been sent!</p>
        <p>Category: {form_category}</p>
        <p>User acceptance: {acknowledgement}</p>
        <p>Comments: {form_description ? form_description : null}</p>
      </React.Fragment>
    ) : (
    <div className="flex flex-col w-full items-center" id="requestTicket">
      <div className="flex bg-white/70 px-10 my-3">
        <p className='text-sm flex flex-col text-black font-base py-1'>
          <span>For {area}, please refer to the Frequently Asked Questions FAQ Page <a href="#" className="underline">
           here </a></span>
          <span>In case of emergencies, please contact us at {contactNo}</span>
        </p>
      </div>
      <div className="flex bg-form border-gray-200 rounded-lg shadow sm:p-5">
        <form onSubmit={this.handleSubmit} className="space-y-5">
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
            value={form_title}
            name="form_title"
            placeholder={"Please type in a title"}
            error={false}
            disabled={false}
            layout={"vertical"}
            onChange={this.handleChange}/>
          <DropdownField
            type={"text"}
            label="Category"
            classnames="w-1/4"
            padding_right="0"
            value={form_category}
            name="form_category"
            error={false}
            disabled={false}
            layout={"vertical"}
            options={categories}
            onChange={this.handleChange}/>
          <AreaField
            label={"Description"}
            classnames=""
            padding_right={"0"}
            value=""
            id="form_description"
            disabled={false}
            layout={"vertical"}
            placeholder="Please inclue any additional remarks here."
            onInput={this.handleChange}/>
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
            value={acknowledgement}
            name="acknowledgement"
            error={false}
            disabled={false}
            onChange={this.handleChange}/>
          <SubmitButton
            type="submit"
            label="Submit"
            handleClick={this.handleSubmit}
            />
        </form>
      </div>
    </div>
  )}
  </React.Fragment>
  );
}
}

export default TestFlow;