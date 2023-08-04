import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BuildingDetailsForm from '../components/BuildingDetails';
import BuildingsTable from '../components/tables/BuildingsTable';
import BackArrowIcon from '../images/back_arrow_icon.svg';

const Buildings = () => {
  const navigate = useNavigate();
  const [isClicked, setClicked] = useState(false);
  const handleAccClick = () => {
    setClicked(true);
  };
  const handleDeleteClick = () => {
    setClicked(false);
  };
  const handleBack = () => {
    navigate('/adminDashboard');
  };
  return (
    <>
      <div className={`h-auto bg-[#ECEDED] flex-1 ${isClicked ? 'opacity-20' : ''}`}>
        <a href="#/">
          <div className="flex items-center ml-5 mt-5" onClick={handleBack}>
            <img src={BackArrowIcon} alt="back arrow"></img>
            <p className="ml-5 text-xl">Back to Panel</p>
          </div>
        </a>
        <div className="h-auto w-full flex flex-col justify-center items-center">
          <div className="w-auto md:w-4/5">
            <div className="flex-grow flex flex-col justify-center items-center">
              <div className="container mx-auto" style={{ maxWidth: '1329px', height: '656px' }}>
                <div className="text-left text-3xl w-full mb-4">
                  <p>Buildings</p>
                </div>

                <BuildingsTable clicked={isClicked} handleClick={handleAccClick} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute top-8 right-64">
        {isClicked && <BuildingDetailsForm handleDelClick={handleDeleteClick} />}
      </div>
    </>
  );
};

export default Buildings;
