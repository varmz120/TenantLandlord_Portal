import FormGallery from '../components/Gallery';
import AreaField from '../components/AreaField';
import LineField from '../components/LineField';
import AttachmentGallery from '../components/Gallery';
import Gallery from '../components/Gallery';
import Status from '../components/Status';

function ViewTicket() {
    var ticket_id = "007";
    var location = "Sunplaza";
    var unit = "01-35";
    var category = "Defects";
    var description= "Lorem ipsum blablabla Lorem ipsum blablabla Lorem ipsum blablabla"

    return (
      <div className="bg-content font-3xl" id="content">
        <div id="viewTicket">
            <div>
                <p className='text-headerText pt-12 pb-12 text-2xl font-medium'>Service Ticket #{ticket_id} : {location} Unit {unit}</p>
            </div>
            <div className="mx-auto w-full max-w-fit bg-form border-gray-200 rounded-lg shadow sm:p-6">
                <form className="space-y-6">
                    <p className="text-lg text-left font-medium">Title</p>
                    <hr className="h-px my-8 bg-gray-300 border-0 drop-shadow-md"></hr>
                    <LineField
                      type={"text"}
                      label="Name"
                      padding_right="75"
                      value={category}
                      name="name"
                      placeholder={""}
                      error={false}
                      disabled={true}
                      onChange={()=> null}/>
                    {/* <OutputField
                      label={"Category"}
                      value={category}
                      name="description"
                      disabled={true}
                      placeholder='' 
                      padding_right={'48'}/> */}
                    <AreaField
                        label={"Description"}
                        padding_right={"32"}
                        value={description}
                        name="description"
                        disabled={true}
                        placeholder=''/>
                    <Gallery
                        label={"Attachments"}
                        value=''
                        padding_right={"0"}/>
                    <hr className="h-px my-8 bg-gray-300 border-0 drop-shadow-md"></hr>
                    <Status
                        label={"Status"}
                        value={"Opened"}
                        padding_right={"0"}/>
                </form>
            </div>
        </div>
      </div>
    );
  }
  
  export default ViewTicket;