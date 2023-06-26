import AreaField from '../components/AreaField';
import LineField from '../components/LineField';
import Gallery from '../components/Gallery';
import Status from '../components/Status';
import ActionRequired from '../components/ActionRequired';
import DropdownField from '../components/DropdownField';
import UploadField from '../components/UploadField';
import TermsConditionsCheckbox from '../components/TermsConditionsCheckbox';
import SubmitButton from '../components/SubmitButton';
import React, {ChangeEvent, FormEvent, useState} from 'react'

// GO TO https://css-tricks.com/demonstrating-reusable-react-components-in-a-form/

class TestFlow extends React.Component {
  state : {[key: string]: any} = {
    form: {
      form_title: ""
      // form_category: "",
      // form_description: "",
      // acknowledgement: false
    },
    errors: {},
    submitted: false
  };

  handleChange = (event : ChangeEvent<HTMLInputElement>): void => {
    console.log("Handling...");
    console.log(this.state);
    const { form } = this.state;
    form[event.target.name] = event.target.value;
    this.setState({ form });
    console.log("At end of handling");
    console.log(this.state);
  };

  handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    console.log("Submitting...");
    console.log(this.state);
    const {
      form: { form_title }
    } = this.state;
    let err : {[key: string]: any} = {};

    if (!form_title) {
      err.form_title = "Enter a title!";
      console.log("SHDNT PRINT");
    }

    // if (!form_category) {
    //   err.form_category = "Enter a title!";
    // }

    // if (!acknowledgement) {
    //   err.acknowledgement = "Enter a title!";
    // }

    this.setState({ errors : err }, () => {
      console.log("hmm i think its here")
      if (Object.getOwnPropertyNames(this.state.errors).length === 0) {
        this.setState({ submitted: true });
        console.log("Success");
      } else {
        console.log("Hmm");
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
  
  const {
    submitted,
    errors,
    form: {form_title}
  } = this.state;
  return (
    <React.Fragment>
    {submitted ? (
      <p>Yay! {form_title} ticket has been sent!</p>
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
            value=""
            name="title"
            placeholder={""}
            error={false}
            disabled={false}
            layout={"vertical"}
            onChange={this.handleChange}/>
          <AreaField
            label={"Description"}
            classnames=""
            padding_right={"0"}
            value=""
            name="description"
            disabled={false}
            layout={"vertical"}
            placeholder=''/>
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
            value=""
            name="tc"
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