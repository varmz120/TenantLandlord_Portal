import AreaField from '../components/AreaField';
import LineField from '../components/LineField';
import Gallery from '../components/Gallery';
import Status from '../components/Status';
import ActionRequired from '../components/ActionRequired';

function ViewTicket() {
    // Mock static values
    var ticket_id = "007";
    var location = "Sunplaza";
    var unit = "01-35";
    var category = "Defects";
    var description= "Lorem ipsum blablabla Lorem ipsum blablabla Lorem ipsum blablabla"

    return (
      <div className="flex flex-col font-3xl w-full" id="viewTicket">
            <div className='flex justify-center pb-1'>
                <p className='text-headerText py-5 text-2xl font-medium'>Service Ticket #{ticket_id} : {location} Unit {unit}</p>
            </div>
            <div className="flex mx-auto bg-form border-gray-200 rounded-lg shadow sm:p-7">
                <form className="space-y-4">
                    <p className="text-lg text-left font-medium">Title</p>
                    <hr className="h-[1px] bg-gray-300 border-0 drop-shadow-md"></hr>
                    <LineField
                      type={"text"}
                      label="Name"
                      padding_right="75"
                      value={category}
                      name="name"
                      placeholder={""}
                      error={false}
                      disabled={true}
                      layout=''
                      onChange={()=> null}/>
                    <AreaField
                        label={"Description"}
                        padding_right={"32"}
                        value={description}
                        name="description"
                        disabled={true}
                        layout=''
                        placeholder=''/>
                    <Gallery
                        label={"Attachments"}
                        value=''
                        padding_right={"0"}/>
                    <hr className="h-[2px] bg-gray-300 border-0 drop-shadow-md"></hr>
                    <div className="grid grid-cols-2">
                      <Status
                        label={"Status"}
                        value={"Opened"}
                        padding_right={"0"}/>
                      <ActionRequired
                        label={"Action Required"}
                        value={"View Quote"}
                        padding_right={"32"}
                        alert={true}/>
                    </div>
                </form>
            </div>
      </div>
    );
  }
  
  export default ViewTicket;