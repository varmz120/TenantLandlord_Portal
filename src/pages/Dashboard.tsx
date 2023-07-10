import React, { useState } from 'react';
import trashBinIcon from '../images/trash_bin_icon.svg';
import addServiceProviderIcon from '../images/add_service_provider_icon.svg';
import filterIcon from '../images/filter_icon.svg';
import { useNavigate, useLocation } from "react-router-dom";

// making a dashbaord component
const Dashboard = () => {
  // useStates
  const [userIsActive, setUserIsActive] = useState(false);
  const handleUserActive = () => {
    setUserIsActive(true);
  };

  const [tableData, setTableData] = useState([
    { ID: 1, Item: 'Fix Floor', Category: 'Doe', Date: ' ', Status: ' ' },
    { ID: 2, Item: 'Fix Floor', Category: 'Doe', Date: ' ', Status: ' ' },
    { ID: 3, Item: 'Pest Control', Category: 'Doe', Date: ' ', Status: ' ' },
    { ID: 4, Item: 'Pest Control', Category: 'Doe', Date: ' ', Status: ' ' },
    { ID: 5, Item: 'Fix Floor', Category: 'Doe', Date: ' ', Status: ' ' },
    { ID: 6, Item: 'Pest Control', Category: 'Doe', Date: ' ', Status: ' ' },
    { ID: 7, Item: 'Leaking Pipe', Category: 'Doe', Date: ' ', Status: ' ' },
    { ID: 8, Item: 'Fix Floor', Category: 'Doe', Date: ' ', Status: ' ' },
    { ID: 9, Item: 'Pest Control', Category: 'Doe', Date: ' ', Status: ' ' },
    { ID: 10, Item: 'Pest Control', Category: 'Doe', Date: ' ', Status: ' ' },
    { ID: 11, Item: 'Fix Floor', Category: 'Doe', Date: ' ', Status: ' ' },
    { ID: 12, Item: 'Pest Control', Category: 'Doe', Date: ' ', Status: ' ' },
    { ID: 13, Item: 'Leaking Pipe', Category: 'Doe', Date: ' ', Status: ' ' },
    { ID: 14, Item: 'John', Category: 'Doe', Date: ' ', Status: ' ' },
    { ID: 15, Item: 'John', Category: 'Doe', Date: ' ', Status: ' ' },
    { ID: 16, Item: 'John', Category: 'Doe', Date: ' ', Status: ' ' },
    { ID: 17, Item: 'John', Category: 'Doe', Date: ' ', Status: ' ' },
  ]);

  const navigate = useNavigate();
  const locate = useLocation();

  //
  const [filterValue, setFilterValue] = useState('');

  const handleUserInactive = () => {
    setUserIsActive(false);
  };

  // Check all checkbox function using indeterminate checkbox
  const [checked, setChecked] = useState([]);

  const handleCheckAll = () => {
    if (checked.length === tableData.length) {
      setChecked([]);
    } else {
      const newChecked = tableData.map((row) => row.ID);
      setChecked(newChecked);
    }
  };

  const handleCheck = (itemId) => {
    if (checked.includes(itemId)) {
      setChecked((prevItems) => prevItems.filter((id) => id !== itemId));
    } else {
      setChecked((prevItems) => [...prevItems, itemId]);
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
  const handleStatusUpdate = (itemId, e) => {
    const updateTableData = tableData.map((row) => {
      if (row.ID === itemId) {
        return { ...row, Status: e.target.value };
      }
      return row;
    });
    setTableData(updateTableData);
  };

  // Function for delete row
  const deleteRow = (rowId) => {
    let copy = [...tableData];
    copy = copy.filter((row) => !rowId.includes(row.ID));
    setTableData(copy);
  };

  return (
    // Card component that will be used to display the data
    <div className="flex justify-center items-center h-screen">
      <div className="container mx-auto" style={{ maxWidth: '1329px', height: '656px' }}>
        <div
          className="bg-navbar flex items-center justify-between rounded-t-lg drop-shadow-2xl"
          style={{ height: '87px', paddingLeft: '20px', paddingRight: '20px' }}
        >
          <div className="flex items-center">
            <a /* New Request Button */
              href="#"
              className="block rounded flex border-solid border-1 px-2 py-1 mr-4
                                        flex justify-center items-center text-[#3180ba] bg-[#edfdff] active:text-[#cbe6ec] active:bg-[#193446]"
              onMouseDown={handleUserActive}
              onMouseUp={handleUserInactive}
              onMouseLeave={handleUserInactive}
              style={{ width: '200px', height: '60px' }}
              onClick={()=>navigate('/newRequest')}
            >
              <div className="mx-auto">New Request</div>
            </a>
          </div>
          <div className="flex items-center">
            
            <a /* Filter Icon Button */
              href="#"
              className="block rounded-full px-5 py-5 mr-4
                                    flex items-center bg-[#edfdff] active:text-[#cbe6ec] active:bg-[#193446] "
              onMouseDown={handleUserActive}
              onMouseUp={handleUserInactive}
              onMouseLeave={handleUserInactive}
              style={{ width: '57px', height: '57px' }}
            >
              <img
                src={userIsActive ? filterIcon : filterIcon}
                className="mx-auto scale-150"
                alt="?"
              ></img>
            </a>
            <span /* Select All Button */
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
            </span>
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
                <th className="border px-4 py-2 bg-tableHeader text-white"></th>
                <th className="border px-4 py-2 bg-tableHeader text-white">S/N</th>
                <th className="border px-4 py-2 bg-tableHeader text-white">
                  Item/Task Description
                  {filterValue && (
                    <span className="ml-2 text-sm text-gray-500">
                      (Filtered by {filterValue})
                    </span>
                  )}
                </th>
                <th className="border px-4 py-2 bg-tableHeader text-white">Category</th>
                <th className="border px-4 py-2 bg-tableHeader text-white">Date</th>
                <th className="border px-4 py-2 bg-tableHeader text-white">Status</th>
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
                  <td className="px-4 py-2">
                    <select
                      value={row.Status}
                      onChange={(e) => handleStatusUpdate(row.ID, e)}
                      className="block appearance-none w-full bg-white border border-gray-300 
                                                  hover:border-gray-400 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                    >
                      {statusOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </td>
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