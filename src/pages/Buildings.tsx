import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import BuildingDetailsForm from '../components/BuildingDetailsForm';
import BuildingsTable from '../components/tables/BuildingsTable';
import BackArrowIcon from '../images/back_arrow_icon.svg';
import { client } from '../client';

const Buildings = () => {
  const [buildingData, setBuildingData] = useState([{ ID: '', Name: '' , Address:''}]);
  const[initialRender,setInitialRender] = useState(true);

  const navigate = useNavigate();
  const [isClicked, setClicked] = useState(false);
  const getBuildingsData = async () => {
    try {
      const buildingData = await client.service('building').find();
      const buildings = buildingData.data;
      const buildingsUpdated = buildings.map((building) => ({
        ID: building._id,
        Name: building.name,
        Address: building.address,


      }));
      // console.log(adminUsersUpdated);
      return buildingsUpdated;
    } catch (error) {
      console.error('Error fetching buildings:', error);
      return null;
    }
  };
  

  const fetchBuildingData = async () => {
    try {
      const buildingDataFetched = await getBuildingsData();
      // console.log(buildingDataFetched);

      

      if (buildingDataFetched !== null) {
        setBuildingData(buildingDataFetched);
        // console.log(buildingData);
      } else {
        // Handle the case when adminData is null (error occurred)
        // You can set it to an empty array or handle it based on your use case.
        setBuildingData([]);
      }
    } catch (error) {
      console.error('Error fetching Buildings:', error);
      // Handle the error case
      setBuildingData([]);
    }
  };

  const Buildingtable :React.FC=()=>{
    return <BuildingsTable clicked={isClicked} handleClick={handleAccClick } data={buildingData}/>
  }

  useEffect(() => {
    fetchBuildingData();   
    
    

    
    
    
    
  }, [ ]);
  




  const handleAccClick = () => {
    setClicked(true);
  };
  const handleDeleteClick = () => {
    setClicked(false);
    fetchBuildingData();
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

                <Buildingtable />
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
