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

  // UseStates & Backend Data
  const [filterActive, setFilter] = useState(false);
  const [filterValue, setFilterValue] = useState('');
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

  // Handlers
  const handleButtonClick = (event: MouseEvent<HTMLButtonElement | HTMLDivElement>): void => {
    event.preventDefault();

    if ('id' in event.target) {
      if (event.target.id === 'filter') {
        setFilter(!filterActive);
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
                      href="/#"
                      className={
                        'block rounded-full px-5 py-5 mr-4 flex items-center ' +
                        (filterActive
                          ? 'bg-activeField'
                          : 'bg-userNameButton hover:bg-buttonActive')
                      }
                      style={{ width: '55px', height: '55px' }}
                      id="filter"
                    >
                      <img
                        src={filterActive ? filterDarkIcon : filterIcon}
                        className="mx-auto scale-150"
                        alt="?"
                        id="filter"
                      ></img>
                    </a>
                  </div>
                </div>
                <div className="bg-white h-full overflow-y-auto rounded-b-lg drop-shadow-2xl">
                  {filterActive ? (
                    <div className="flex justify-between px-4 py-2">
                      <input
                        type="text"
                        value={filterValue}
                        onChange={(e) => setFilterValue(e.target.value)}
                        placeholder="Filter using keywords"
                        className="border border-gray-300 rounded px-4 py-2"
                      />
                      {filterValue && (
                        <span className="mt-4 text-sm text-gray-500">
                          (Filtered by {filterValue})
                        </span>
                      )}
                      <button
                        onClick={() => setFilterValue('')}
                        className="border border-gray-300 rounded px-4 py-2"
                      >
                        Clear Filter
                      </button>
                    </div>
                  ) : (
                    ''
                  )}
                  <table className="table-auto w-full">
                    <thead>
                      <tr>
                        <th className="border px-4 py-2 bg-tableHeader text-userNameText">S/N</th>
                        <th className="border px-4 py-2 bg-tableHeader text-userNameText">
                          Item/Task Description
                        </th>
                        <th className="border px-4 py-2 bg-tableHeader text-userNameText">
                          Category
                        </th>
                        <th className="border px-4 py-2 bg-tableHeader text-userNameText">Date</th>
                        <th className="border px-4 py-2 bg-tableHeader text-userNameText">
                          Status
                        </th>
                        <th className="border px-4 py-2 bg-tableHeader text-userNameText">
                          Personnel Assigned
                        </th>
                      </tr>
                    </thead>
                    <tbody className="">
                      {tableData
                        .filter(
                          (row) =>
                            row.Item.toLowerCase().includes(filterValue.toLowerCase()) ||
                            row.Category.toLowerCase().includes(filterValue.toLowerCase()) ||
                            row.Landlord.toLowerCase().includes(filterValue.toLowerCase()) ||
                            row.Status.toLowerCase().includes(filterValue.toLowerCase())
                        )
                        .map((row, index) => (
                          <tr
                            className="hover:bg-tableHover hover:shadow-lg"
                            key={row.ID}
                            onClick={e => handleRowClick(e, index)}
                          >
                            <td className="px-4 py-2">{row.ID}</td>
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
