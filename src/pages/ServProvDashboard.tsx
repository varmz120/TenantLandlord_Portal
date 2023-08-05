import React, { useState, useContext, MouseEvent, useEffect } from 'react';
import filterIcon from '../images/filter_icon.svg';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';
import { client } from '../client';
import { Ticket } from '../client';
import { AuthContext } from '../contexts/AuthContext';

const statusMap = [
  'Opened',
  'Waiting for Quotation Approval',
  'In Queue',
  'In Progress',
  'Pending Completion Approval',
  'Rejected',
  'Closed',
];

// making a dashboard component
const Dashboard = () => {
  const {user} = useContext(AuthContext);
  // useStates
  const navigate = useNavigate();
  const [userIsActive, setUserIsActive] = useState(false);
  const [isRowVisible, setIsRowVisible] = useState(false);
  const [searchInputs, setSearchInputs] = useState<Record<TableColumn, string>>({
    ID: '',
    Item: '',
    Category: '',
    PersonnelAssigned: '',
    Date: '',
    Status: '',
  });

  // Check all checkbox function using indeterminate checkbox
  const [checked, setChecked] = useState<string[]>([]);
  const [updatedTicketIds, setUpdatedTicketIds] = useState<string[]>([]);


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
    PersonnelAssigned: string;
    Date: string;
    Status: string;
  }

  const [categoryOptions, setCategoryOptions] = useState<Array<{ value: string }>>([]);
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const tableData = tickets.map((t) => ({
    ID: t._id.toString(),
    Item: t.title,
    Category: t.requestType,
    PersonnelAssigned: t.personnelAssigned ?? 'None',
    Date: new Date(t.openedOn).toLocaleDateString(),
    Status: statusMap[t.status],
  }));
  // Define a type for the column names
  type TableColumn = 'ID' | 'Item' | 'Category' | 'PersonnelAssigned' | 'Date' | 'Status';


  const [filteredTableData, setFilteredTableData] = useState<TableDataItem[]>(tableData);
  //Implement row click to View Specific Ticket
  const handleRowClick = (event: MouseEvent<HTMLTableRowElement>, index: number): void => {
    event.preventDefault();

    navigate('/ServProvViewTicket', { state: tickets[index] });
  };


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
      PersonnelAssigned: '',
      Date: '',
      Status: '',
    });

    setFilteredTableData(tableData);
  };

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

  const handleCheck = (itemId: string, event:React.ChangeEvent<HTMLInputElement>) => {
    event.stopPropagation();
    if (checked.includes(itemId)) {
      setChecked((prevItems) => prevItems.filter((id) => id !== itemId));
    } else {
      setChecked((prevItems) => [...prevItems, itemId]);
    }
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

  async function fetchCategoryOptions() {
    // Get the building id of the currently logged-in user
    const building_id = user?.buildingId;

    // Fetch the users with the same building id
    const allusers = await client.service('users').find();
    const usersWithSameBuildingId = allusers.data.filter(
      (users) => users.buildingId == building_id && users.typ == 1
    );
    console.log('fetchcat:', usersWithSameBuildingId);
    return usersWithSameBuildingId;

    // Do whatever you want with these users...
  }

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
          PersonnelAssigned: t.personnelAssigned ?? 'None',
          Date: new Date(t.openedOn).toLocaleDateString(),
          Status: statusMap[t.status],
        }));
        setFilteredTableData(tableData);
      });
    fetchCategoryOptions().then((serviceProviders) => {
      setCategoryOptions(serviceProviders.map((user) => ({ value: user._id })));
    });
  }, []);

  useEffect(() => {
    let tableData = tickets.map((t) => ({
      ID: t._id.toString(),
      Item: t.title,
      Category: t.requestType ?? 'None',
      PersonnelAssigned: t.personnelAssigned ?? 'None',
      Date: new Date(t.openedOn).toLocaleDateString(),
      Status: statusMap[t.status],
    }));

    setFilteredTableData(tableData);
    updateTicket();
  }, [tickets]);


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
                  <th className="border px-4 py-2 bg-[#3180BA] text-white">Category</th>
                  <th className="border px-4 py-2 bg-[#3180BA] text-white">Personnel Assigned</th>
                  <th className="border px-4 py-2 bg-[#3180BA] text-white">Date</th>
                  <th className="border px-4 py-2 bg-[#3180BA] text-white">Status</th>
                </tr>
              </thead>
              <tbody className="">
                {filteredTableData.map((row, i) => (
                  <tr
                    className="hover:bg-tableHover hover:shadow-lg"
                    key={row.ID}
                    onClick={(e) => handleRowClick(e, i)}
                  >
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
                    <td className="px-4 py-2">{row.PersonnelAssigned}</td>
                    <td className="px-4 py-2">{row.Date}</td>
                    <td className="px-4 py-2">{row.Status}</td>
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