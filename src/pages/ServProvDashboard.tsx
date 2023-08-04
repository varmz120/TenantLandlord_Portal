import React, { useState, MouseEvent } from 'react';
import trashBinIcon from '../images/trash_bin_icon.svg';
import filterIcon from '../images/filter_icon.svg';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';
import { client } from '../client';
import { ticket } from '../esc-backend/src/services/ticket/ticket';
import Status from '../components/Status';

// making a dashboard component
const Dashboard = () => {
  // useStates
  const navigate = useNavigate();
  const [userIsActive, setUserIsActive] = useState(false);

  const handleUserActive = () => {
    setUserIsActive(true);
  };

  const handleUserInactive = () => {
    setUserIsActive(false);
  };

  interface TableDataItem {
    ID: string;
    Item: string;
    Category: string;
    Date: string;
    Status: string;
  }

  const [tableData, setTableData] = useState<TableDataItem[]>([
    { ID: '1', Item: 'Fix Floor', Category: 'Doe', Date: '06/06', Status: ' ' },
    { ID: '2', Item: 'Fix Floor', Category: 'Doe', Date: '06/06', Status: ' ' },
    { ID: '3', Item: 'Pest Control', Category: 'Doe', Date: '06/06', Status: ' ' },
    { ID: '4', Item: 'Pest Control', Category: 'Doe', Date: '06/06', Status: ' ' },
    { ID: '5', Item: 'Fix Floor', Category: 'Doe', Date: '06/06', Status: ' ' },
    { ID: '6', Item: 'Pest Control', Category: 'Doe', Date: '06/06', Status: ' ' },
    { ID: '7', Item: 'Leaking Pipe', Category: 'Doe', Date: '06/06', Status: ' ' },
    { ID: '8', Item: 'Fix Floor', Category: 'Doe', Date: '06/06', Status: ' ' },
    { ID: '9', Item: 'Pest Control', Category: 'Doe', Date: '06/06', Status: ' ' },
    { ID: '10', Item: 'Pest Control', Category: 'Doe', Date: '06/06', Status: ' ' },
    { ID: '11', Item: 'Fix Floor', Category: 'Doe', Date: '06/06', Status: ' ' },
    { ID: '12', Item: 'Pest Control', Category: 'Doe', Date: '06/06', Status: ' ' },
    { ID: '13', Item: 'Leaking Pipe', Category: 'Doe', Date: '06/06', Status: ' ' },
    { ID: '14', Item: 'John', Category: 'Doe', Date: '06/06', Status: ' ' },
    { ID: '15', Item: 'John', Category: 'Doe', Date: '06/06', Status: ' ' },
    { ID: '16', Item: 'John', Category: 'Doe', Date: '06/06', Status: ' ' },
    { ID: '17', Item: 'John', Category: 'Doe', Date: '06/06', Status: ' ' },
  ]);

  // Define a type for the column names
  type TableColumn = 'ID' | 'Item' | 'Category' | 'Date' | 'Status';

  // Update the state and event handler with the TableColumn type
  const [searchInputs, setSearchInputs] = useState<Record<TableColumn, string>>({
    ID: '',
    Item: '',
    Category: '',
    Date: '',
    Status: '',
  });

  //Implement row click to View Specific Ticket
  const handleRowClick = (event: MouseEvent<HTMLTableRowElement>): void => {
    event.preventDefault();

    navigate('/ServProvViewTicket');
  };

  // Implement Filter function for table
  const [filteredTableData, setFilteredTableData] = useState<TableDataItem[]>(tableData);

  const applyFilters = (data: TableDataItem[], filters: Record<TableColumn, string>): TableDataItem[] => {
    return data.filter((row) => {
      for (const column of Object.keys(filters) as TableColumn[]) {
        const filterValue = filters[column].toLowerCase();
        const rowValue = row[column].toString().toLowerCase();
        if (filterValue && !rowValue.includes(filterValue)) {
          return false;
        }
      }
      return true;
    });
  };

  // Update the handleSearchInputChange function to use applyFilters
  const handleSearchInputChange = (column: TableColumn, value: string) => {
    setSearchInputs((prevState) => ({
      ...prevState,
      [column]: value,
    }));

    const filteredData = applyFilters(tableData, {
      ...searchInputs,
      [column]: value,
    });

    setFilteredTableData(filteredData);
  };

  //Implement Clear Filter function for table
  const handleClearFilters = () => {
    setSearchInputs({
      ID: '',
      Item: '',
      Category: '',
      Date: '',
      Status: '',
    });

    setFilteredTableData(tableData);
  };

  //Implement Hidden Filter Row function for table
  const [isRowVisible, setIsRowVisible] = useState(false);

  const toggleRowVisibility = () => {
    setIsRowVisible(!isRowVisible);
  };

  // Check all checkbox function using indeterminate checkbox
  const [checked, setChecked] = useState<string[]>([]);

  const handleCheckAll = () => {
    if (checked.length === tableData.length) {
      setChecked([]);
    } else {
      const newChecked = tableData.map((row) => row.ID);
      setChecked(newChecked);
    }
  };

  const handleCheck = (itemId: string, event:React.ChangeEvent<HTMLInputElement>) => {
    event.stopPropagation();
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
  const handleStatusUpdate = async (itemId: string, e: React.ChangeEvent<HTMLSelectElement>) => {
    e.stopPropagation();
    const ticketId = parseInt(itemId, 10);
    const updateTableData = tableData.map((row) => {
      if (row.ID === itemId) {
        return { ...row, Status: e.target.value };
      }
      return row;
    });
    setTableData(updateTableData);
    const updateFilteredTableData = filteredTableData.map((row) => {
      if (row.ID === itemId) {
        return { ...row, Status: e.target.value };
      }
      return row;
    });
    setFilteredTableData(updateFilteredTableData);
    try {
      await client.service('ticket').registerWorkFinished({ticketId})
    } catch (error) {
      console.error('Failed to change ticket status',error);
    }
  };

  // Function for delete row
  const deleteRow = (rowId: string[]) => {
    let copy = [...tableData];
    copy = copy.filter((row) => !rowId.includes(row.ID));
    setTableData(copy);
    let filtercopy = [...filteredTableData];
    filtercopy = filtercopy.filter((row) => !rowId.includes(row.ID));
    setFilteredTableData(filtercopy);
  };

  return (
    // Card component that will be used to display the data
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="flex-grow flex flex-col h-screen bg-[#ECEDED] justify-center items-center">
        <div className="container mx-auto" style={{ maxWidth: '1329px', height: '656px' }}>
          <div
            className="flex items-center justify-between bg-[#31556F] rounded-t-lg drop-shadow-2xl z-10 relative"
            style={{ height: '87px', paddingLeft: '20px', paddingRight: '20px' }}
          >
            <div className="flex items-center">
              <button /* Clear Filter Button */
                onClick={handleClearFilters}
                className="block rounded flex border-solid border-1 px-2 py-1 mr-4
                                            flex justify-center items-center text-[#3180ba] bg-[#edfdff] active:text-[#cbe6ec] active:bg-[#193446]"
              >
                Clear Filters
              </button>
            </div>
            <div className="flex items-center">
              <a /* Filter Icon Button */
                href="#/"
                className="block rounded-full px-5 py-5 mr-4
                                        flex items-center bg-[#edfdff] active:text-[#cbe6ec] active:bg-[#193446] "
                onMouseDown={handleUserActive}
                onMouseUp={handleUserInactive}
                onMouseLeave={handleUserInactive}
                onClick={toggleRowVisibility}
                style={{ width: '57px', height: '57px' }}
              >
                <img
                  src={userIsActive ? filterIcon : filterIcon}
                  className="mx-auto scale-150"
                  alt="Filter"
                ></img>
              </a>
              <a /* Delete Button */
                href="#/"
                className="block rounded-full px-5 py-5 mr-4
                                        flex items-center bg-[#edfdff] active:text-[#cbe6ec] active:bg-[#193446]"
                onMouseDown={handleUserActive}
                onMouseUp={handleUserInactive}
                onMouseLeave={handleUserInactive}
                onClick={() => {
                  deleteRow(checked);
                  console.log(checked);
                }}
                style={{ width: '57px', height: '57px' }}
              >
                <img
                  src={userIsActive ? trashBinIcon : trashBinIcon}
                  className="mx-auto scale-150"
                  alt="Delete Button"
                ></img>
              </a>
              <div className="relative">
              </div>

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
          <div className="bg-white h-full overflow-y-auto rounded-b-lg drop-shadow-2xl z-0">
            <table className="table-auto w-full relative">
              <thead>
                <tr style={{ display: isRowVisible ? 'table-row' : 'none' }}>
                  <th className="border px-4 py-2 bg-[gray] text-white"></th>

                  <th className="border px-4 py-2 bg-[gray] text-white">
                    ID
                    <input
                      type="text"
                      value={searchInputs.ID}
                      onChange={(e) => handleSearchInputChange('ID', e.target.value)}
                      placeholder="Search ID"
                      style={{ color: 'gray' }}
                    />
                  </th>

                  <th className="border px-4 py-2 bg-[gray] text-white">
                    Task/Description
                    <input
                      type="text"
                      value={searchInputs.Item}
                      onChange={(e) => handleSearchInputChange('Item', e.target.value)}
                      placeholder="Search Item"
                      style={{ color: 'gray' }}
                    />
                  </th>

                  <th className="border px-4 py-2 bg-[gray] text-white">
                    Personnel Assigned
                    <input
                      type="text"
                      value={searchInputs.Category}
                      onChange={(e) => handleSearchInputChange('Category', e.target.value)}
                      placeholder="Search Category"
                      style={{ color: 'gray' }}
                    />
                  </th>

                  <th className="border px-4 py-2 bg-[gray] text-white">
                    Date
                    <input
                      type="text"
                      value={searchInputs.Date}
                      onChange={(e) => handleSearchInputChange('Date', e.target.value)}
                      placeholder="Search Date"
                      style={{ color: 'gray' }}
                    />
                  </th>

                  <th className="border px-4 py-2 bg-[gray] text-white">
                    Status
                    <input
                      type="text"
                      value={searchInputs.Status}
                      onChange={(e) => handleSearchInputChange('Status', e.target.value)}
                      placeholder="Search Status"
                      style={{ color: 'gray' }}
                    />
                  </th>
                </tr>
                <tr>
                  <th className="border px-4 py-2 bg-[#3180BA] text-white"></th>
                  <th className="border px-4 py-2 bg-[#3180BA] text-white">ID</th>
                  <th className="border px-4 py-2 bg-[#3180BA] text-white">Task/Description</th>
                  <th className="border px-4 py-2 bg-[#3180BA] text-white">Personnel Assigned</th>
                  <th className="border px-4 py-2 bg-[#3180BA] text-white">Date</th>
                  <th className="border px-4 py-2 bg-[#3180BA] text-white">Status</th>
                </tr>
              </thead>
              <tbody className="">
                {filteredTableData.map((row) => (
                  <tr className="hover:bg-tableHover hover:shadow-lg" key={row.ID} onClick={handleRowClick}>
                    <td className="px-4 py-2">
                      <input
                        type="checkbox"
                        checked={checked.includes(row.ID)}
                        onChange={(event) => handleCheck(row.ID, event)}
                        onClick={(event) => event.stopPropagation()}
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
                        onClick={(event) => event.stopPropagation()}
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
    </div>
  );
};

export default Dashboard;