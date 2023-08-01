import LandlordNavbar from '../components/LandlordNavbar';
import AreaField from '../components/AreaField';
import LineField from '../components/LineField';
import Gallery from '../components/Gallery';
import StarRating from '../components/StarRating';
import BackButton from '../components/BackButton';
import { useNavigate, useLocation } from "react-router-dom";

function ViewTicket() {
  const navigate = useNavigate();
  const locate = useLocation();

  console.log(locate.state);

  const handleBack = () => {
    navigate('/LandlordDashboard')
  }

  // Mock static values
  var ticket_id = "007";
  var unit = "01-42";
  var location = "Sunplaza"
  var completed_date = "06/06/2023"
  //var isSubmit = locate.state? locate.state.isSubmit : false;
  var title = "Feedback";
  var remarks=  "Good work, appreciate it! No other work needs to be done for now.";
  //var isClosed = locate.state? locate.state.isClosed : false;

  return (
    <div className="flex flex-col h-screen">
      <LandlordNavbar />
      <div className="flex flex-col h-screen bg-[#ECEDED] font-3xl" id="viewTicket">
          <BackButton
            type="button"
            label={"ticket details"}
            handleClick={handleBack}
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