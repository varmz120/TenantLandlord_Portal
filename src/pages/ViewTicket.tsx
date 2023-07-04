import AreaField from '../components/AreaField';
import LineField from '../components/LineField';
import Gallery from '../components/Gallery';
import Status from '../components/Status';
import ActionRequired from '../components/ActionRequired';
import BackButton from '../components/BackButton';
import ActionButton from '../components/ActionButton';
import { useNavigate, useLocation } from "react-router-dom";

function ViewTicket() {
  const navigate = useNavigate();
  const locate = useLocation();

  console.log(locate.state);

  // Mock static values
  var ticket_id = "007";
  var building = "SunPlaza";
  var unit = "01-42";
  var formState = locate.state? locate.state.formState :  null;
  var isSubmit = locate.state? locate.state.isSubmit : false;
  var title = locate.state? formState.formTitle : "";
  var category = locate.state? formState.formCategory : "";
  var description= locate.state? formState.formDescription : "";
  var isClosed = locate.state? locate.state.isClosed : false;

  return (
      <div className="flex flex-col font-3xl" id="viewTicket">
            <BackButton
              type="button"
              label={"all tickets"}
              handleClick={()=>navigate('/', {state: {formState, isSubmit, isClosed}})}
              layout=''/>
            <div className='flex justify-center'>
                <p className='text-headerText pb-5 text-2xl font-medium'>Service Ticket #{ticket_id} : {building} Unit {unit}</p>
            </div>
            <div className='flex flex-row justify-center'>
            <div className="flex w-fit bg-form border-gray-200 rounded-lg shadow sm:p-7">
                <form className="space-y-4">
                    <p className="text-lg text-left font-medium">{title}</p>
                    <hr className="h-[1px] bg-gray-300 border-0 drop-shadow-md"></hr>
                    <LineField
                      type={"text"}
                      label="Category"
                      padding_right="50"
                      value={category}
                      name="category"
                      placeholder={""}
                      error={""}
                      disabled={true}
                      layout=''
                      classnames='w-1/3'
                      onChange={()=> null}/>
                    <AreaField
                        label={"Description"}
                        classnames="w-4/5"
                        padding_right={"32"}
                        value={description}
                        id="description"
                        disabled={true}
                        layout=''
                        error={""}
                        placeholder="Please inclue any additional remarks here."
                        onChange={()=>null} />
                    <Gallery
                        label={"Attachments"}
                        value=''
                        padding_right={"0"}/>
                    <hr className="h-[2px] bg-gray-300 border-0 drop-shadow-md"></hr>
                    <div className="grid grid-cols-2 pt-1">
                      <Status
                        label={"Status"}
                        value={"Opened"}
                        padding_right={"0"}/>
                      <div className="flex flex-col pt-1">
                      {isClosed?
                      <ActionRequired
                      label={"Action Required"}
                      padding_right={"32"}
                      alert={false}/> 
                      :
                      <ActionRequired
                        label={"Action Required"}
                        padding_right={"32"}
                        alert={true}/>}
                      <div className='flex flex-row'>
                      {isClosed ?
                      null :
                      isSubmit ? 
                      <ActionButton
                      value={"Rate Ticket"}
                      padding_right={"30"}
                      type=""
                      firstViewState={false}
                      toggle={false}
                      onClick={()=>navigate('/feedbackSurvey', {state: {formState, isSubmit: false}})}/>
                      :
                      <ActionButton
                      value={"View Quote"}
                      padding_right={"30"}
                      type=""
                      firstViewState={false}
                      toggle={false}
                      onClick={()=>navigate('/viewQuote', {state: {formState, isSubmit: true}})}/>
                      }
                    </div>
                    </div>
                    </div>
                </form>
            </div>
            <div className='ml-2 w-3/7 flex h-fit bg-form border-gray-200 rounded-lg shadow sm:p-7'>
              <div className='space-y-4'>
                <p className="text-lg text-left font-medium">Landlord Assigned</p>
                <hr className="h-[1px] bg-gray-300 border-0 drop-shadow-md"></hr>
                <LineField
                      type={"text"}
                      label="Name"
                      padding_right="65"
                      value={"Mr Smoy"}
                      name="landlord"
                      placeholder={""}
                      error={""}
                      disabled={true}
                      layout=''
                      classnames='w-3/5'
                      onChange={()=> null}/>
                <LineField
                      type={"text"}
                      label="Contact"
                      padding_right="50"
                      value={"+65 8766 3211"}
                      name="landlordCtc"
                      placeholder={""}
                      error={""}
                      disabled={true}
                      layout=''
                      classnames='w-3/5'
                      onChange={()=> null}/>
              </div>
            </div>
            </div>
      </div>
    );
  }
  
  export default ViewTicket;