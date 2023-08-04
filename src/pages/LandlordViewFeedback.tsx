import LandlordNavbar from '../components/LandlordNavbar';
import AreaField from '../components/AreaField';
import LineField from '../components/LineField';
import Gallery from '../components/Gallery';
import StarRating from '../components/StarRating';
import BackButton from '../components/BackButton';
import { useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { useContext, useEffect, useState } from 'react';
import { Ticket } from '../esc-backend/src/client';
import { client } from '../client';

function ViewTicket() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const locate = useLocation();
  type UnitType = {
    number: string;
    buildingId: string;
    leaseId: string;
  };

  const [unit, setUnit] = useState<UnitType | null>(null);
  const [address, setAddress] = useState('');
  const ticket: Ticket = locate.state;

  const handleBack = () => {
    navigate('/LandlordDashboard');
  };

  const ticket_id = ticket._id;
  const completed_date = new Date(ticket?.completedOn).toLocaleDateString();
  const rating = ticket.feedback?.rating;
  const remarks = ticket.feedback?.description;
  const title = ticket.title;

  const getUnitNo = async () => {
    const lease = await client.service('lease').get(user?.leaseId ?? '');
    const units = lease.units.filter((unit) => unit.buildingId == user?.buildingId);
    return units[0];
  };

  const getBuildingAddress = async () => {
    const building = client.service('building').get(unit?.buildingId ?? '');
    return (await building).address;
  };

  useEffect(() => {
    getBuildingAddress().then((address) => setAddress(address));
    getUnitNo().then((unit) => {
      setUnit(unit);
    });
  }, []);

  return (
    <div className="flex flex-col h-screen">
      <LandlordNavbar />
      <div className="flex flex-col h-screen bg-[#ECEDED] font-3xl" id="viewTicket">
        <BackButton type="button" label={'ticket details'} handleClick={handleBack} />
        <div className="flex justify-center">
          <p className="text-headerText pb-5 text-2xl font-medium">
            Feedback for #00{ticket_id} : {address} Unit {unit?.number}
          </p>
        </div>
        <div className="flex mx-auto w-fit bg-white border-gray-200 rounded-lg shadow sm:p-7">
          <form className="space-y-4">
            <div className="flex flex-row w-full">
              <p className="flex text-lg text-left font-medium">{title}</p>
            </div>
            <hr className="h-[1px] bg-gray-300 border-0 drop-shadow-md"></hr>
            <StarRating
              label="Rating"
              padding_right="106"
              rating={rating}
              error=""
              handleClick={() => null}
            />
            <LineField
              type={'text'}
              label="Completed On"
              padding_right="40"
              value={completed_date}
              name="completed on"
              placeholder={''}
              error={''}
              disabled={true}
              layout=""
              classnames="w-2/5"
              onChange={() => null}
            />
            <AreaField
              label={'Remarks'}
              classnames="w-4/5"
              padding_right="80"
              value={remarks}
              id="remarks"
              disabled={true}
              layout=""
              error={''}
              placeholder="Please include any additional remarks here."
              onChange={() => null}
            />
            <Gallery label={'Attachments'} values="" padding_right={'0'} />
          </form>
        </div>
      </div>
    </div>
  );
}
export default ViewTicket;
