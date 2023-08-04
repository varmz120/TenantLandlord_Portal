import React, { useState, useContext, MouseEvent, useEffect } from 'react';
import filterIcon from '../images/filter_icon.svg';
import filterDarkIcon from '../images/filter_icon_dark.svg';
import ActionButton from '../components/ActionButton';

import { useNavigate, Navigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { client } from '../client';
import { Ticket } from '../esc-backend/src/client';

const statusMap = [
  "Opened",
  "Waiting for Quotation Approval",
  "In Queue",
  "In Progress",
  "Pending Completion Approval",
  "Rejected",
  "Closed",
];

const TenantDashboard = () => {
  // Navigation & routing
  const navigate = useNavigate();

  // Context
  const { user } = useContext(AuthContext);

  //Implement Hidden Filter Row function for table
  const [isRowVisible, setIsRowVisible] = useState(false);

  const [userIsActive, setUserIsActive] = useState(false);

  const handleUserActive = () => {
    setUserIsActive(true);
  };

  const handleUserInactive = () => {
    setUserIsActive(false);
  };

  const toggleRowVisibility = () => {
    setIsRowVisible(!isRowVisible);
  };

  interface TableDataItem {
    ID: Number;
    Item: string;
    Category: string;
    Date: string;
    Status: string;
    Landlord: string;
  }

  // Mock static values
  const [tickets, setTickets] = useState<Ticket[]>([]);

  const tableData = tickets.map(t => ({
          ID: t._id,
          Item: t.title,
          Category: t.requestType,
          Date: new Date(t.openedOn).toLocaleDateString(),
          Status: statusMap[t.status],
          Landlord: t.personnelAssigned ?? 'None',
  }));

  // Define a type for the column names
  type TableColumn = 'ID' | 'Item' | 'Category' | 'Date' | 'Status' | 'Landlord';

  // Update the state and event handler with the TableColumn type
  const [searchInputs, setSearchInputs] = useState<Record<TableColumn, string>>({
    ID: '',
    Item: '',
    Category: '',
    Date: '',
    Status: '',
    Landlord: '',
  });

  // UseStates & Backend Data
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
      Landlord: '',
    })
  };

  
  // Handlers
  const handleButtonClick = (event: MouseEvent<HTMLButtonElement | HTMLDivElement>): void => {
    event.preventDefault();


    if ('id' in event.target) {
      if (event.target.id === 'filter') {
         toggleRowVisibility();
        } else if (event.target.id === 'action') {
        navigate('/newRequest');
      }
    }
  };

  useEffect(() => {
    client.service('ticket').find().then(tickets => {
      setTickets(tickets.data);
    });
  }, []);

  const handleRowClick = (event: MouseEvent<HTMLTableRowElement>, index: number): void => {
    event.preventDefault();

    navigate('/viewDetails', { state: tickets[index] });
  };

  return (
    <React.Fragment>
      {/* // When user is not logged in */}
      {user === null ? (
        <Navigate to="/403" replace={true} />
      ) : (
        <React.Fragment>
          {/* // When user is logged in AND a tenant */}
          {user?.typ === 0 ? (
            <div className="flex justify-center items-center">
              <div
                className="container mx-auto mt-10"
                style={{ maxWidth: '1329px', height: '656px' }}
              >
                <div
                  className="bg-navbar flex items-center justify-between rounded-t-lg drop-shadow-2xl"
                  style={{ height: '80px', paddingLeft: '20px', paddingRight: '20px' }}
                >
                  <div className="flex items-center">
                    <ActionButton
                      value={'New Request'}
                      padding_right={'0'}
                      type="request"
                      toggle={false}
                      firstViewState={false}
                      onClick={handleButtonClick}
                    />
                  </div>
                  <div className="flex items-center" onClick={handleButtonClick} id="filter">
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
                  </div>
                </div>
                <div className="bg-white h-full overflow-y-auto rounded-b-lg drop-shadow-2xl">
                      <table className="table-auto w-full relative">
                        <thead>
                          <tr style={{ display: isRowVisible ? 'table-row' : 'none' }}>
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
                                placeholder="Search Personnel Assigned"
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
                            <th className="border px-4 py-2 bg-[#3180BA] text-white">ID</th>
                            <th className="border px-4 py-2 bg-[#3180BA] text-white">Task/Description</th>
                            <th className="border px-4 py-2 bg-[#3180BA] text-white">Category</th>
                            <th className="border px-4 py-2 bg-[#3180BA] text-white">Personnel Assigned</th>
                            <th className="border px-4 py-2 bg-[#3180BA] text-white">Date</th>
                            <th className="border px-4 py-2 bg-[#3180BA] text-white">Status</th>
                          </tr>
                        </thead>
                      <tbody className="">
                        {filteredTableData.map((row, index) => (
                          <tr className="hover:bg-tableHover hover:shadow-lg" key={String(row.ID)} onClick={e => handleRowClick(e, index)}>
                            <td className="px-4 py-2">{String(row.ID)}</td>
                            <td className="px-4 py-2">{row.Item}</td>
                            <td className="px-4 py-2">{row.Category}</td>
                            <td className="px-4 py-2">{row.Date}</td>
                            <td className="px-4 py-2">{row.Status}</td>
                            <td className="px-4 py-2">{row.Landlord}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                </div>
              </div>
            </div>
          ) : (
            // When user is logged in but NOT a tenant
            <Navigate to="/403" replace={true} />
          )}
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default TenantDashboard;
