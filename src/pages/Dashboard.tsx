import ActionButton from "../components/ActionButton";

function Dashboard() {
    // Mock static values
    var ticket_id = "007";
    var ticket_title = "Mock Ticket Title";
    var location = "Sunplaza";
    var unit = "01-35";
    var category = "Defects";
    var description= "Lorem ipsum blablabla Lorem ipsum blablabla Lorem ipsum blablabla"

    return (
      <div className="flex flex-col font-3xl" id="viewTicket">
            <div className='flex justify-center'>
                <p className='text-headerText py-5 text-2xl font-medium'>Dashboard (TODO)</p>
            </div>
            <div className="flex flex-row self-center">
            <div className="flex w-fit bg-form border-gray-200 rounded-lg shadow sm:p-7">
                <form className="space-y-4">
                    <p className="text-lg text-left font-medium">#{ticket_id} {ticket_title} - {location} {unit}</p>
                    <hr className="h-[1px] bg-gray-300 border-0 drop-shadow-md"></hr>
                </form>
            </div>
            <div className="flex">
                <ActionButton
                        value={"New Request"}
                        padding_right={"20"}
                        type=""
                        firstViewState={false}
                        toggle={false}
                        onClick={()=>null}/>
                        </div>
            </div>
      </div>
    );
  }
  
  export default Dashboard;