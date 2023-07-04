import AreaField from '../components/AreaField';
import LineField from '../components/LineField';
import ActionRequired from '../components/ActionRequired';
import BackButton from '../components/BackButton';
import ActionButton from '../components/ActionButton';
import { useNavigate, useLocation } from "react-router-dom";

function ViewQuote() {
    const navigate = useNavigate();
    const locate = useLocation();

    console.log(locate.state);

    // Mock static values
    var ticket_id = "007";
    var location = "SunPlaza";
    var landlord = "Mr Soy";
    var unit = "01-42";
    var amount = "250.00";
    var description= "Lorem ipsum blablabla Lorem ipsum blablabla Lorem ipsum blablabla";
    var formState = locate.state? locate.state.formState :  null;
    var isSubmit = locate.state? locate.state.isSubmit : false;
    var title = locate.state? formState.formTitle : "";

    return (
      <div className="flex flex-col font-3xl" id="viewTicket">
            <BackButton
              type="button"
              label={"all tickets"}
              handleClick={()=>navigate('/viewDetails', {state: {formState, isSubmit: false}})}
              layout=''/>
            <div className='flex justify-center'>
                <p className='text-headerText pb-5 text-2xl font-medium'>Quotation for #{ticket_id} : {location} Unit {unit}</p>
            </div>
            <div className="flex mx-auto my-auto max-w-content bg-form border-gray-200 rounded-lg shadow sm:p-7">
                <div className='grid grid-cols-2'>
                <form className="space-y-5">
                        <p className="text-lg text-left font-medium">{title}</p>
                        <hr className="h-[1px] bg-gray-300 border-0 drop-shadow-md"></hr>
                        <LineField
                        type={"text"}
                        label="Uploaded by"
                        padding_right="106"
                        value={landlord}
                        name="landlord"
                        placeholder={""}
                        error={""}
                        disabled={true}
                        layout=''
                        classnames='w-2/5'
                        onChange={()=> null}/>
                        <LineField
                        type={"text"}
                        label="Total Amount (SGD)"
                        padding_right="50"
                        value={amount}
                        name="amount"
                        placeholder={""}
                        error={""}
                        disabled={true}
                        layout=''
                        classnames='w-2/5'
                        onChange={()=> null}/>
                        <AreaField
                        label={"Description"}
                        classnames="w-4/5"
                        padding_right={"115"}
                        value={description}
                        id="description"
                        disabled={true}
                        layout=''
                        error={""}
                        placeholder="Please inclue any additional remarks here."
                        onChange={()=>null} />
                        <hr className="h-[2px] bg-gray-300 border-0 drop-shadow-md"></hr>
                        <ActionRequired
                        label={"Action Required"}
                        padding_right={"0"}
                        alert={true}/>
                        <div className='flex flex-row gap-x-4'>
                        <ActionButton
                        value={"Accept"}
                        padding_right={"0"}
                        type="accept"
                        firstViewState={false}
                        toggle={false}
                        onClick={()=>navigate('/viewDetails', {state: {formState, isSubmit: true}})}/>
                        <ActionButton
                        value={"Reject"}
                        padding_right={"0"}
                        type="reject"
                        firstViewState={false}
                        toggle={false}
                        onClick={()=>navigate('/viewDetails', {state: {formState, isSubmit: false}})}/>
                        </div>
                </form>
                <div className='border-l-2 border-gray-300 drop-shadow-md items-center'>
                    <p className='text-lg text-left font-medium text-headerText text-center'>Document View</p>
                     <iframe src={'./images/alertImg.svg'} className='flex mx-auto my-5 h-2/5 w-2/3'/>
                     <iframe srcDoc={'<html><body><p>Quote will be displayed here in iframe.</p></body></html>'} className='flex mx-auto h-1/4 w-2/3 mb-1'/>
                    <ActionButton
                    value={"Download Quote"}
                    padding_right={"0"}
                    type="download"
                    firstViewState={false}
                    toggle={false}
                    onClick={()=>null}/>
                </div>
                </div>
            </div>
      </div>
    );
  }
  
  export default ViewQuote;