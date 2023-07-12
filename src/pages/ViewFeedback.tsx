import Navbar from '../components/Navbar';
import AreaField from '../components/AreaField';
import LineField from '../components/LineField';
import Gallery from '../components/Gallery';
import Status from '../components/Status';
import ActionRequired from '../components/ActionRequired';
import BackButton from '../components/BackButton';
import ActionButton from '../components/ActionButton';
import { useNavigate, useLocation } from "react-router-dom";

function ViewTicket() {
  //const navigate = useNavigate();
  //const locate = useLocation();

  //console.log(locate.state);

  // Mock static values
  var ticket_id = "007";
  var building = "SunPlaza";
  var unit = "01-42";
  var formState = "formState";
  //var isSubmit = locate.state? locate.state.isSubmit : false;
  var title = "Feedback";
  var category = "";
  var description=  "Good work, appreciate it! No other work needs to be done for now.";
  //var isClosed = locate.state? locate.state.isClosed : false;

  return (
    <div className="flex flex-col h-screen bg-[#ECEDED]">
      <Navbar />

      <div className="flex flex-col font-3xl" id="viewTicket">
            <BackButton
              type="button"
              label={"view ticket"}
              handleClick={()=>null}
              layout=''/>
            <div className='flex justify-center'>
                <p className='text-headerText pb-5 text-2xl font-medium'>Service Ticket #{ticket_id} : {building} Unit {unit}</p>
            </div>
            <div className='flex flex-row justify-center'>
            <div className="flex w-fit bg-white border-gray-200 rounded-lg shadow sm:p-7">
                <form className="space-y-4">
                    <p className="text-lg text-left font-medium">{title}</p>
                    <hr className="h-[1px] bg-gray-300 border-0 drop-shadow-md"></hr>
                    <div className="star-rating">
                      {[...Array(5)].map((star) => {        
                        return (         
                          <span className="star">&#9733;</span>        
                        );
                      })}
                    </div>
                    <AreaField
                        label={"Description"}
                        classnames="w-5/5"
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
                    <hr className="h-[2px] bg-gray-300 border-0"></hr>
                </form>
            </div>
            </div>
        </div>
      </div>
    );
  }
  
  export default ViewTicket;