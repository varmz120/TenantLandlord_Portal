import React, { useState, MouseEvent } from 'react';
import trashBinIcon from '../images/trash_bin_icon.svg';
import addServiceProviderIcon from '../images/add_service_provider_icon.svg';
import filterIcon from '../images/filter_icon.svg';
import ActionButton from '../components/ActionButton';
import { useNavigate, useLocation } from "react-router-dom";

// TODO: 1) Reroute for demo with correct navigate, locate and usestates. 2) Update filter dropdown.

// old Dashboard for demo
// function Dashboard() {
//   const navigate = useNavigate();
//   const locate = useLocation();

//   // // TODO: Opt-in option for users (tenant, landlords)
//   // //  Mock static values
//   // var ticket_id = "007";
//   // var ticket_title = "Mock Ticket Title";
//   // var location = "Sunplaza";
//   // var unit = "01-35";

//   const formState = locate.state? locate.state.formState : null;
//   var isClosed = locate.state? locate.state.isClosed : null;
//   var ticket_id = locate.state ? "007" : "TID";
//   var ticket_title = locate.state? formState.formTitle : "Ticket Title";
//   var submitStatus = locate.state? locate.state.isSubmit : false;
//   var building = "SunPlaza";
//   var unit = "01-42";

//   if (locate.state) {
//       console.log(locate.state);

// return (
//   <div className="flex flex-col font-3xl" id="viewTicket">
//         <div className='flex justify-center'>
//             <p className='text-headerText py-5 text-2xl font-medium'>Dashboard (TODO)</p>
//         </div>
//         <div className="flex flex-row self-center">
//         <div className="flex w-fit bg-form border-gray-200 rounded-lg shadow sm:p-7">
//             <form className="space-y-4">
//                 <p className="text-lg text-left font-medium">#{ticket_id} : {ticket_title} ({building} #{unit}) </p>
//                 <hr className="h-[1px] bg-gray-300 border-0 drop-shadow-md"></hr>
//                 {submitStatus ? 
//                     <ActionButton
//                     value={"View Details"}
//                     padding_right={""}
//                     type=""
//                     firstViewState={false}
//                     toggle={false}
//                     onClick={()=>navigate('/viewDetails', {state: {formState, isSubmit: false, isClosed }})} />
//                 : ""}
//             </form>
//         </div>
//         <div className="flex">
//             <ActionButton
//                     value={"New Request"}
//                     padding_right={"20"}
//                     type=""
//                     firstViewState={false}
//                     toggle={false}
//                     onClick={()=>navigate('/newRequest')} />
//         </div>
//         </div>
//   </div>
// );
// }

// export default Dashboard;

const Dashboard = () => {

  // useStates
  const [userIsActive, setUserIsActive] = useState(false);
  const handleUserActive = () => {
    setUserIsActive(true);
  };

  const [tableData, setTableData] = useState([
    { ID: 1, Item: 'Fix Floor', Category: 'Repair', Date: ' ', Status: ' ' },
    { ID: 2, Item: 'Fix Floor', Category: 'Repair', Date: ' ', Status: ' ' },
    { ID: 3, Item: 'Pest Control', Category: 'Cleanliness', Date: ' ', Status: ' ' },
    { ID: 4, Item: 'Pest Control', Category: 'Cleanliness', Date: ' ', Status: ' ' },
    { ID: 5, Item: 'Fix Floor', Category: 'Repair', Date: ' ', Status: ' ' }
  ]);

  const navigate = useNavigate();
  const locate = useLocation();
  const [firstView, setFirstView] = useState(true);

  const handleButtonClick = (event: MouseEvent<HTMLButtonElement>) : void => {
    //event.stopPropagation();
    event.preventDefault();

    console.log("AM HERE");

    navigate('/newRequest');
  };


  //
  const [filterValue, setFilterValue] = useState('');

  const handleUserInactive = () => {
    setUserIsActive(false);
  };

  // Check all checkbox function using indeterminate checkbox
  const [checked, setChecked] = useState<any>([]);

  const handleCheckAll = () => {
    if (checked.length === tableData.length) {
      setChecked([]);
    } else {
      const newChecked = tableData.map((row) => row.ID);
      setChecked(newChecked);
    }
  };

  const handleCheck = (itemId: number) => {
    if (checked.includes(itemId)) {
      setChecked((prevItems: any[]) => prevItems.filter((id: any) => id !== itemId));
    } else {
      setChecked((prevItems: any) => [...prevItems, itemId]);
    }
  };

  // Status Drop Down Update Function
  const statusOptions = [
    { value: '', label: 'No Status' },
    { value: 'Completed', label: 'Completed' },
    { value: 'Pending Tenant Approval', label: 'Pending Tenant Approval' },
    { value: 'Work in Progress', label: 'Work in Progress' },
    { value: 'Open', label: 'Open' },
  ];

  // Function to update the status of the row for dropdown selection
  const handleStatusUpdate = (itemId: number, e: React.ChangeEvent<HTMLSelectElement>) => {
    const updateTableData = tableData.map((row) => {
      if (row.ID === itemId) {
        return { ...row, Status: e.target.value };
      }
      return row;
    });
    setTableData(updateTableData);
  };

  // Function for delete row
  const deleteRow = (rowId: number[]) => {
    let copy = [...tableData];
    copy = copy.filter((row) => !rowId.includes(row.ID));
    setTableData(copy);
  };

  return (
    // Card component that will be used to display the data
    <div className="flex justify-center items-center">
      <div className="container mx-auto mt-10" style={{ maxWidth: '1329px', height: '656px' }}>
        <div
          className="bg-navbar flex items-center justify-between rounded-t-lg drop-shadow-2xl"
          style={{ height: '80px', paddingLeft: '20px', paddingRight: '20px' }}
        >
          <div className="flex items-center">
            {/* <a /* New Request Button
              className="block rounded flex border-solid border-1 px-2 py-1 mr-4
                                        flex justify-center items-center text-[#3180ba] bg-[#edfdff] active:text-[#cbe6ec] active:bg-[#193446]"
              onMouseDown={handleUserActive}
              onMouseUp={handleUserInactive}
              onMouseLeave={handleUserInactive}
              style={{ width: '200px', height: '60px' }}
              onClick={()=>navigate('/newRequest')}
            >
              <div className="mx-auto">New Request</div>
            </a> */}
             <ActionButton
                        value={"New Request"}
                        padding_right={"0"}
                        type="request"
                        toggle={false}
                        firstViewState={firstView}
                        onClick={handleButtonClick}/>
          </div>
          <div className="flex items-center">
            
            <a /* Filter Icon Button */
              href="#"
              className="block rounded-full px-5 py-5 mr-4
                                    flex items-center bg-[#edfdff] active:text-[#cbe6ec] active:bg-[#193446] "
              onMouseDown={handleUserActive}
              onMouseUp={handleUserInactive}
              onMouseLeave={handleUserInactive}
              style={{ width: '55px', height: '55px' }}
            >
              <img
                src={userIsActive ? filterIcon : filterIcon}
                className="mx-auto scale-150"
                alt="?"
              ></img>
            </a>
            {/* 
            <span /* Select All Button
              className="block rounded flex border-solid border-1 px-2 py-1
                                        flex justify-center items-center text-[#3180ba] bg-[#edfdff]"
              style={{ width: '200px', height: '60px' }}
            >
              <div className="mx-auto">
                <input
                  className="mr-4 scale-150"
                  type="checkbox"
                  checked={checked.length === tableData.length}
                  onChange={handleCheckAll}
                  ref={(el) => {
                    if (el) {
                      el.indeterminate = checked.length > 0 && checked.length < tableData.length;
                    }
                  }}
                />
                Select All
              </div>
            </span> */}
          </div>
        </div>
        <div className="bg-white h-full overflow-y-auto rounded-b-lg drop-shadow-2xl">
          <div className="flex justify-between px-4 py-2 mt-4">
            <input
              type="text"
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
              placeholder="Filter by Item"
              className="border border-gray-300 rounded px-4 py-2"
            />
            <button
              onClick={() => setFilterValue('')}
              className="border border-gray-300 rounded px-4 py-2"
            >
              Clear Filter
            </button>
          </div>
          <table className="table-auto w-full">
            <thead>
              <tr>
                <th className="border px-4 py-2 bg-tableHeader text-userNameText"></th>
                <th className="border px-4 py-2 bg-tableHeader text-userNameText">S/N</th>
                <th className="border px-4 py-2 bg-tableHeader text-userNameText">
                  Item/Task Description
                  {filterValue && (
                    <span className="ml-2 text-sm text-gray-500">
                      (Filtered by {filterValue})
                    </span>
                  )}
                </th>
                <th className="border px-4 py-2 bg-tableHeader text-userNameText">Category</th>
                <th className="border px-4 py-2 bg-tableHeader text-userNameText">Date</th>
                <th className="border px-4 py-2 bg-tableHeader text-userNameText">Status</th>
              </tr>
            </thead>
            <tbody className="">
            {tableData
                .filter((row) =>
                  row.Item.toLowerCase().includes(filterValue.toLowerCase())
                )
                .map((row) => (
                <tr className="hover:bg-tableHover hover:shadow-lg" key={row.ID}>
                  <td className="px-4 py-2">
                    <input
                      type="checkbox"
                      checked={checked.includes(row.ID)}
                      onChange={() => handleCheck(row.ID)}
                    />
                  </td>
                  <td className="px-4 py-2">{row.ID}</td>
                  <td className="px-4 py-2">{row.Item}</td>
                  <td className="px-4 py-2">{row.Category}</td>
                  <td className="px-4 py-2">{row.Date}</td>
                  <td className="px-4 py-2">{row.Status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;