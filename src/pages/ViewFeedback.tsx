import Navbar from '../components/Navbar';
import AreaField from '../components/AreaField';
import LineField from '../components/LineField';
import Gallery from '../components/Gallery';
import StarRating from '../components/StarRating';
import ActionRequired from '../components/ActionRequired';
import BackButton from '../components/BackButton';
import ActionButton from '../components/ActionButton';
import { useNavigate, useLocation } from "react-router-dom";
import { ChangeEvent } from 'react';

function ViewTicket() {
  //const navigate = useNavigate();
  //const locate = useLocation();

  //console.log(locate.state);

  // Mock static values
  var ticket_id = "007";
  var building = "SunPlaza";
  var unit = "01-42";
  var location = "Sunplaza"
  var formState = "formState";
  var completed_date = "06/06/2023"
  //var isSubmit = locate.state? locate.state.isSubmit : false;
  var title = "Feedback";
  var category = "";
  var remarks=  "Good work, appreciate it! No other work needs to be done for now.";
  //var isClosed = locate.state? locate.state.isClosed : false;

  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="flex flex-col h-screen bg-[#ECEDED] font-3xl" id="viewTicket">
          <BackButton
            type="button"
            label={"ticket details"}
            handleClick={()=>null}
        />
        <div className='flex justify-center'>
          <p className='text-headerText pb-5 text-2xl font-medium'>Feedback for #00{ticket_id} : {location} Unit {unit}</p>
        </div>
        <div className="flex mx-auto w-fit bg-white border-gray-200 rounded-lg shadow sm:p-7">
              <form className="space-y-4">
              <div className='flex flex-row w-full'>
                  <p className="flex text-lg text-left font-medium">{title}</p>
              </div>
                  <hr className="h-[1px] bg-gray-300 border-0 drop-shadow-md"></hr>
                  <StarRating 
                  label='Rating'
                  padding_right="106"
                  rating={5}
                  error=''
                  handleClick={()=>null}/>
                  <LineField
                    type={"text"}
                    label="Completed On"
                    padding_right="40"
                    value={completed_date}
                    name="completed on"
                    placeholder={""}
                    error={""}
                    disabled={true}
                    layout=''
                    classnames='w-2/5'
                    onChange={()=> null}/>
                      <AreaField
                      label={"Remarks"}
                      classnames="w-4/5"
                      padding_right="80"
                      value={remarks}
                      id="remarks"
                      disabled={true}
                      layout=''
                      error={""}
                      placeholder="Please include any additional remarks here."
                      onChange={()=>null} />
                    <Gallery
                        label={"Attachments"}
                        value=''
                        padding_right={"0"}/>
                </form>
            </div>
        </div>
      </div>
    );
  }
  export default ViewTicket;