import React, { useState, MouseEvent, useEffect } from 'react';
import trashBinIcon from '../images/trash_bin_icon.svg';
import addServiceProviderIcon from '../images/add_service_provider_icon.svg';
import filterIcon from '../images/filter_icon.svg';
import LandlordNavbar from '../components/LandlordNavbar';
import { useNavigate } from 'react-router-dom';
<<<<<<< ours
import { client } from '../client';
=======
import { AuthContext } from '../contexts/AuthContext';
import { client } from '../client';
import { Ticket } from '../esc-backend/src/client';
import { ticket } from '../esc-backend/lib/services/ticket/ticket';

const statusMap = [
  'Opened',
  'Waiting for Quotation Approval',
  'In Queue',
  'In Progress',
  'Pending Completion Approval',
  'Rejected',
  'Closed',
];
>>>>>>> theirs

// making a dashboard component
const Dashboard = () => {

  const handleCategorySelect = async (rowId: string[], category: string) => {
      const updatedTableData = tableData.map((row) => {
        if (checked.includes(row.ID)) {
          return { ...row, Category: category };
        }
        return row;
      });
      setTableData(updatedTableData);
      setFilteredTableData(updatedTableData);
    for (var Id of rowId) {
    for (var personnelId of category) {
      const ticketId = parseInt(Id, 10);
      const perAssg = {ticketId, personnelId}
      console.log('the assigned personnel is ' + personnelId);
      try {
        await client.service('ticket').assignPersonnel(perAssg);
      } catch (error) {
        console.error('Failed to assign personnel', error);
      }
    }
    }
  };

  // Function for delete row
  // const deleteRow = (rowId: string[]) => {
  //   let copy = [...tableData];
  //   copy = copy.filter((row) => !rowId.includes(row.ID));
  //   setTableData(copy);
  //   let filtercopy = [...filteredTableData];
  //   filtercopy = filtercopy.filter((row) => !rowId.includes(row.ID));
  //   setFilteredTableData(filtercopy);
  // };

  const deleteRow = async (rowId: string[]) => {
    //delete this after the backend retrieving to table works
    let copy = [...tableData];
    copy = copy.filter((row) => !rowId.includes(row.ID));
    setTableData(copy);
    let filtercopy = [...filteredTableData];
    filtercopy = filtercopy.filter((row) => !rowId.includes(row.ID));
    setFilteredTableData(filtercopy);
    console.log(rowId);
    for (var Id of rowId) {
      console.log('the id is ' + Id);
      try {
        await client.service('ticket').remove(Id);
      } catch (error) {
        console.error('Failed to delete ticket', error);
      }
    }
  };

  const [ticket_ID, setTicketID] = useState(0);

  const getTicketData = async () => {
    try {
      const response = await client.service('ticket').find({query: {_id: ticket_ID}});
      const tickets = response.data;
      console.log('tickets are:' + tickets)
      return tickets;
    } catch (error) {
      console.error('Failed to get ticket data', error);
      return null;
    }
  };

  // useStates
  const navigate = useNavigate();
  const [updatedTicketIds, setUpdatedTicketIds] = useState<string[]>([]);

  const [userIsActive, setUserIsActive] = useState(false);
  const [isRowVisible, setIsRowVisible] = useState(false);
  const [searchInputs, setSearchInputs] = useState<Record<TableColumn, string>>({
    ID: '',
    Item: '',
    Category: '',
    Date: '',
    Status: '',
  });

  // Check all checkbox function using indeterminate checkbox
  const [checked, setChecked] = useState<string[]>([]);
  // Implement Assign Landlord function
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

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
    Landlord: string;
    Date: string;
    Status: string;
  }

<<<<<<< ours
  const [tableData, setTableData] = useState<TableDataItem[]>([
    { ID: '1', Item: 'Fix Floor', Category: 'Doe', Landlord: 'Mr Smoy', Date: '06/06', Status: ' ' },
    { ID: '2', Item: 'Fix Floor', Category: 'Doe', Landlord: 'Mr Smoy', Date: '06/06', Status: ' ' },
    { ID: '3', Item: 'Pest Control', Category: 'Doe', Landlord: 'Mr Smoy', Date: '06/06', Status: ' ' },
    { ID: '4', Item: 'Pest Control', Category: 'Doe', Landlord: 'Mr Smoy', Date: '06/06', Status: ' ' },
    { ID: '5', Item: 'Fix Floor', Category: 'Doe', Landlord: 'Mr Smoy', Date: '06/06', Status: ' ' },
    { ID: '6', Item: 'Pest Control', Category: 'Doe', Landlord: 'Mr Smoy', Date: '06/06', Status: ' ' },
    { ID: '7', Item: 'Leaking Pipe', Category: 'Doe', Landlord: 'Mr Smoy', Date: '06/06', Status: ' ' },
    { ID: '8', Item: 'Fix Floor', Category: 'Doe', Landlord: 'Mr Smoy', Date: '06/06', Status: ' ' },
    { ID: '9', Item: 'Pest Control', Category: 'Doe', Landlord: 'Mr Smoy', Date: '06/06', Status: ' ' },
    { ID: '10', Item: 'Pest Control', Category: 'Doe', Landlord: 'Mr Smoy', Date: '06/06', Status: ' ' },
    { ID: '11', Item: 'Fix Floor', Category: 'Doe',  Landlord: 'Mr Smoy', Date: '06/06', Status: ' ' },
    { ID: '12', Item: 'Pest Control', Category: 'Doe', Landlord: 'Mr Smoy', Date: '06/06', Status: ' ' },
    { ID: '13', Item: 'Leaking Pipe', Category: 'Doe', Landlord: 'Mr Smoy', Date: '06/06', Status: ' ' },
    { ID: '14', Item: 'John', Category: 'Doe', Landlord: 'Mr Smoy', Date: '06/06', Status: ' ' },
    { ID: '15', Item: 'John', Category: 'Doe', Landlord: 'Mr Smoy', Date: '06/06', Status: ' ' },
    { ID: '16', Item: 'John', Category: 'Doe', Landlord: 'Mr Smoy', Date: '06/06', Status: ' ' },
    { ID: '17', Item: 'John', Category: 'Doe', Landlord: 'Mr Smoy', Date: '06/06', Status: ' ' },
  ]);

=======
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const tableData = tickets.map((t) => ({
    ID: t._id.toString(),
    Item: t.title,
    Category: t.requestType,
    Date: new Date(t.openedOn).toLocaleDateString(),
    Status: statusMap[t.status],
    // Landlord: t.personnelAssigned ?? 'None',
  }));
>>>>>>> theirs
  // Define a type for the column names
  type TableColumn = 'ID' | 'Item' | 'Category' | 'Landlord' | 'Date' | 'Status';

<<<<<<< ours
  // Update the state and event handler with the TableColumn type
  const [searchInputs, setSearchInputs] = useState<Record<TableColumn, string>>({
    ID: '',
    Item: '',
    Category: '',
    Landlord: '',
    Date: '',
    Status: '',
  });

=======
  const [filteredTableData, setFilteredTableData] = useState<TableDataItem[]>(tableData);
>>>>>>> theirs
  //Implement row click to View Specific Ticket
  const handleRowClick = (event: MouseEvent<HTMLTableRowElement>): void => {
    event.preventDefault();

    navigate('/LandlordViewTicket');
  };

  // Implement Filter function for table

  const applyFilters = (
    data: TableDataItem[],
    filters: Record<TableColumn, string>
  ): TableDataItem[] => {
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
      Landlord: '',
      Date: '',
      Status: '',
    });

    setFilteredTableData(tableData);
  };

  //Implement Hidden Filter Row function for table

  const toggleRowVisibility = () => {
    setIsRowVisible(!isRowVisible);
  };

  const handleCheckAll = () => {
    if (checked.length === tableData.length) {
      setChecked([]);
    } else {
      const newChecked = tableData.map((row) => row.ID);
      setChecked(newChecked);
    }
  };

  const handleCheck = (itemId: string, event: React.ChangeEvent<HTMLInputElement>) => {
    event.stopPropagation();
    if (checked.includes(itemId)) {
      setChecked((prevItems) => prevItems.filter((id) => id !== itemId));
    } else {
      setChecked((prevItems) => [...prevItems, itemId]);
    }
  };

<<<<<<< ours
  // // Status Drop Down Update Function
  // const statusOptions = [
  //   { value: '', label: 'No Status' },
  //   { value: 'Completed', label: 'Completed' },
  //   { value: 'Pending Tenant Approval', label: 'Pending Tenant Approval' },
  //   { value: 'Work in Progress', label: 'Work in Progress' },
  //   { value: 'Open', label: 'Open' },
  // ];

  // // Function to update the status of the row for dropdown selection
  // const handleStatusUpdate = async (itemId: string, e: React.ChangeEvent<HTMLSelectElement>) => {
  //   e.stopPropagation();
  //   const ticketId = parseInt(itemId, 10);
  //   const updateTableData = tableData.map((row) => {
  //     if (row.ID === itemId) {
  //       return { ...row, Status: e.target.value };
  //     }
  //     return row;
  //   });
  //   setTableData(updateTableData);
  //   const updateFilteredTableData = filteredTableData.map((row) => {
  //     if (row.ID === itemId) {
  //       return { ...row, Status: e.target.value };
  //     }
  //     return row;
  //   });
  //   setFilteredTableData(updateFilteredTableData);
  //   try {
  //     await client.service('ticket').registerWorkFinished({ticketId})
  //   } catch (error) {
  //     console.error('Failed to change ticket status',error);
  //   }
  // };

  // Function for delete row
  // const deleteRow = (rowId: string[]) => {
  //   let copy = [...tableData];
  //   copy = copy.filter((row) => !rowId.includes(row.ID));
  //   setTableData(copy);
  //   let filtercopy = [...filteredTableData];
  //   filtercopy = filtercopy.filter((row) => !rowId.includes(row.ID));
  //   setFilteredTableData(filtercopy);
  // };
=======
  // Status Drop Down Update Function
  const statusOptions = [
    { value: '', label: 'No Status' },
    { value: 'Completed', label: 'Completed' },
    { value: 'Pending Tenant Approval', label: 'Pending Tenant Approval' },
    { value: 'Work in Progress', label: 'Work in Progress' },
    { value: 'Open', label: 'Open' },
  ];

  // Function to update the status of the row for dropdown selection
  const handleStatusUpdate = (itemId: string, e: React.ChangeEvent<HTMLSelectElement>) => {
    e.stopPropagation();
    const updateTableData = tableData.map((row) => {
      if (row.ID === itemId) {
        return { ...row, Status: e.target.value };
      }
      return row;
    });
    // setTableData(updateTableData);
    const updateFilteredTableData = filteredTableData.map((row) => {
      if (row.ID === itemId) {
        return { ...row, Status: e.target.value };
      }
      return row;
    });
    setFilteredTableData(updateFilteredTableData);
  };

  // Function for delete row
  const deleteRow = (rowId: string[]) => {
    let copy = [...tableData];
    copy = copy.filter((row) => !rowId.includes(row.ID));
    // setTableData(copy);
    let filtercopy = [...filteredTableData];
    filtercopy = filtercopy.filter((row) => !rowId.includes(row.ID));
    setFilteredTableData(filtercopy);
  };
>>>>>>> theirs

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

<<<<<<< ours
  // const handleCategorySelect = (category: string) => {
  //   const updatedTableData = tableData.map((row) => {
  //     if (checked.includes(row.ID)) {
  //       return { ...row, Category: category };
  //     }
  //     return row;
  //   });
  //   setTableData(updatedTableData);
  //   setFilteredTableData(updatedTableData);
  // };
=======
  const handleCategorySelect = (category: string) => {
    const updatedTickets = tickets.map((ticket) => {
      if (checked.includes(ticket._id.toString()) && ticket.status < 3) {
        // Update the personnelAssigned field for the selected tickets
        return { ...ticket, personnelAssigned: category };
      }
      return ticket;
    });

    // Get the IDs of the updated tickets
    const updatedTicketIds = updatedTickets
      .filter((ticket, index) => ticket !== tickets[index]) // Compare with the original tickets to find changes
      .map((ticket) => ticket._id.toString());

    // Store the IDs of the updated tickets in state
    setUpdatedTicketIds(updatedTicketIds);

    // Update the tickets and filteredTableData state with the updated data
    setTickets(updatedTickets);

    const tableData = updatedTickets.map((t) => ({
      ID: t._id.toString(),
      Item: t.title,
      Category: t.personnelAssigned ?? 'None',
      Date: new Date(t.openedOn).toLocaleDateString(),
      Status: statusMap[t.status],
    }));

    setFilteredTableData(tableData);
  };

  const updateTicket = async () => {
    for (const updatedRowId of updatedTicketIds) {
      try {
        // Find the updated ticket by its ID from the tickets state array
        const updatedTicket = tickets.find((ticket) => ticket._id.toString() === updatedRowId);
        if (updatedTicket) {
          // Get the personnel ID from the updated ticket
          const personnelID = updatedTicket.personnelAssigned ?? 'None';

          // Call the API to update the ticket using the assignPersonnel method
          await client
            .service('ticket')
            .assignPersonnel({ ticketId: Number(updatedRowId), personnelId: personnelID });
          console.log(`Ticket with ID ${updatedRowId} updated successfully!`);
          // Perform any additional actions or update the local state as needed
        } else {
          console.error(`Ticket with ID ${updatedRowId} not found in the tickets array.`);
        }
      } catch (error) {
        // Handle the error if needed
        console.error(`Error updating the ticket with ID ${updatedRowId}:`, error);
      }
    }
  };
>>>>>>> theirs

  const categoryOptions = [
    { value: 'None', label: 'Selected Category' },
    { value: 'Pest Exterminators', label: 'Pest Exterminators' },
    { value: 'Plumbing', label: 'Plumbing' },
    { value: 'Electrical', label: 'Electrical' },
    { value: 'General Maintenance', label: 'General Maintenance' },
  ];

  useEffect(() => {
    client
      .service('ticket')
      .find()
      .then((tickets) => {
        setTickets(tickets.data);
        let tableData = tickets.data.map((t) => ({
          ID: t._id.toString(),
          Item: t.title,
          Category: t.requestType,
          Date: new Date(t.openedOn).toLocaleDateString(),
          Status: statusMap[t.status],
        }));
        setFilteredTableData(tableData);
      });
  }, []);

  // useEffect(() => {
  //   console.log('updated');
  //   console.log(updatedTicketIds);
  // }, [updatedTicketIds]);

  useEffect(() => {
    let tableData = tickets.map((t) => ({
      ID: t._id.toString(),
      Item: t.title,
      Category: t.personnelAssigned ?? 'None',
      Date: new Date(t.openedOn).toLocaleDateString(),
      Status: statusMap[t.status],
    }));

    setFilteredTableData(tableData);
    updateTicket();
  }, [tickets]);

  useEffect(() => {
    console.log(filteredTableData);
    // console.log(checked);
    // console.log(tickets);
  }, [filteredTableData]);

  return (
    // Card component that will be used to display the data
    <div className="flex flex-col h-screen">
      <LandlordNavbar />
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
                <a
                  href="#/"
                  className="block rounded-full px-5 py-5 mr-4
                      flex items-center bg-[#edfdff] active:text-[#cbe6ec] active:bg-[#193446]"
                  onMouseDown={handleUserActive}
                  onMouseUp={handleUserInactive}
                  onMouseLeave={handleUserInactive}
                  onClick={handleDropdownToggle}
                  style={{ width: '57px', height: '57px' }}
                >
                  <img
                    src={userIsActive ? addServiceProviderIcon : addServiceProviderIcon}
                    className="mx-auto scale-150"
                    alt="+ServiceProvider"
                  />
                </a>
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 py-2 bg-white rounded shadow-lg">
                    {categoryOptions.map((option) => (
                      <button
                        key={option.value}
                        className="block px-4 py-2 text-gray-800 hover:bg-gray-100 w-full text-left"
                        onClick={() => handleCategorySelect(checked, option.value)}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                )}
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
                    Category
                    <input
                      type="text"
                      value={searchInputs.Category}
                      onChange={(e) => handleSearchInputChange('Category', e.target.value)}
                      placeholder="Search Category"
                      style={{ color: 'gray' }}
                    />
                  </th>

                  <th className="border px-4 py-2 bg-[gray] text-white">
                    Personnel Assigned
                    <input
                      type="text"
                      value={searchInputs.Landlord}
                      onChange={(e) => handleSearchInputChange('Landlord', e.target.value)}
                      placeholder="Search Landlord"
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
                  <th className="border px-4 py-2 bg-[#3180BA] text-white">Category</th>
                  <th className="border px-4 py-2 bg-[#3180BA] text-white">Personnel Assigned</th>
                  <th className="border px-4 py-2 bg-[#3180BA] text-white">Date</th>
                  <th className="border px-4 py-2 bg-[#3180BA] text-white">Status</th>
                </tr>
              </thead>
              <tbody className="">
                {filteredTableData.map((row) => (
                  <tr
                    className="hover:bg-tableHover hover:shadow-lg"
                    key={row.ID}
                    onClick={handleRowClick}
                  >
                    <td className="px-4 py-2">
                      <input
                        type="checkbox"
                        checked={checked.includes(row.ID)}
                        onChange={(event) => handleCheck(row.ID, event)}
                        onClick={(event) => event.stopPropagation()}
                      />
                    </td>
<<<<<<< ours
                    <td className="px-4 py-2 text-center">{row.ID}</td>
                    <td className="px-4 py-2 text-center">{row.Item}</td>
                    <td className="px-4 py-2 text-center">{row.Category}</td>
                    <td className="px-4 py-2 text-center">{row.Landlord}</td>
                    <td className="px-4 py-2 text-center">{row.Date}</td>
                    <td className="px-4 py-2 text-center">
                      {/* <select
                        value={row.Status}
                        // onChange={(e) => handleStatusUpdate(row.ID, e)}
                        onClick={(event) => event.stopPropagation()}
                        className="block appearance-none w-full bg-white border border-gray-300 
                                                    hover:border-gray-400 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                      >
                        {statusOptions.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select> */}
                    </td>
=======
                    <td className="px-4 py-2">{row.ID}</td>
                    <td className="px-4 py-2">{row.Item}</td>
                    <td className="px-4 py-2">{row.Category}</td>
                    <td className="px-4 py-2">{row.Date}</td>
                    <td className="px-4 py-2">{row.Status}</td>
>>>>>>> theirs
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
