import ActionButton from "../components/ActionButton";
import { useNavigate, useLocation } from "react-router-dom";

function Dashboard() {
    const navigate = useNavigate();
    const locate = useLocation();

    // Mock static values
    // var ticket_id = "007";
    // var ticket_title = "Mock Ticket Title";
    // var location = "Sunplaza";
    // var unit = "01-35";

    const formState = locate.state? locate.state.formState : null;
    var isClosed = locate.state? locate.state.isClosed : null;
    var ticket_id = locate.state ? "007" : "TID";
    var ticket_title = locate.state? formState.formTitle : "Ticket Title";
    var submitStatus = locate.state? locate.state.isSubmit : false;
    var building = "SunPlaza";
    var unit = "01-42";

    if (locate.state) {
        console.log(locate.state);
    }
    
    return (
      <div className="flex flex-col font-3xl" id="viewTicket">
            <div className='flex justify-center'>
                <p className='text-headerText py-5 text-2xl font-medium'>Dashboard (TODO)</p>
            </div>
            <div className="flex flex-row self-center">
            <div className="flex w-fit bg-form border-gray-200 rounded-lg shadow sm:p-7">
                <form className="space-y-4">
                    <p className="text-lg text-left font-medium">#{ticket_id} : {ticket_title} ({building} #{unit}) </p>
                    <hr className="h-[1px] bg-gray-300 border-0 drop-shadow-md"></hr>
                    {submitStatus ? 
                        <ActionButton
                        value={"View Details"}
                        padding_right={""}
                        type=""
                        firstViewState={false}
                        toggle={false}
                        onClick={()=>navigate('/viewDetails', {state: {formState, isSubmit: false, isClosed }})} />
                    : ""}
                </form>
            </div>
            <div className="flex">
                <ActionButton
                        value={"New Request"}
                        padding_right={"20"}
                        type=""
                        firstViewState={false}
                        toggle={false}
                        onClick={()=>navigate('/newRequest')} />
            </div>
            </div>
      </div>
    );
  }
  
  export default Dashboard;