import React, { useState, useContext, MouseEvent, useEffect } from 'react';

import { useLocation, Navigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

const TenantDashboard = () => {
  // Navigation & routing
  const locate = useLocation();
  var formState = locate.state ? locate.state.formState : null; // Temporary -> for demo purposes w/o backend
  var Seen = locate.state ? locate.state.Seen : ''; // Temporary -> for demo purposes w/o backend
  var Background = locate.state ? locate.state.Background : null; // Temporary -> for demo purposes w/o backend
  var Notification_details = locate.state ? locate.state.Notification_details : null; // Temporary -> for demo purposes w/o backend
  var Time_elapsed = locate.state ? locate.state.Time_elapsed : null; // Temporary -> for demo purposes w/o backend

  // Context
  const { user } = useContext(AuthContext);

  // Mock static values
  const [tableData, setTableData] = useState([
    {
      Notification_details: 'Landlord updated: Service Request #07_563',
      Time_elapsed: '2 minutes ago',
      Seen: false,
      Background: '#EDFDFF',
    },
    {
      Notification_details: 'Landlord updated: Service Request #07_563',
      Time_elapsed: '2 minutes ago',
      Seen: false,
      Background: '#EDFDFF',
    },
    {
      Notification_details: 'Landlord updated: Service Request #07_563',
      Time_elapsed: '2 minutes ago',
      Seen: false,
      Background: '#EDFDFF',
    },
    {
      Notification_details: 'Landlord updated: Service Request #07_563',
      Time_elapsed: '2 minutes ago',
      Seen: false,
      Background: '#EDFDFF',
    },
    {
      Notification_details: 'Landlord updated: Service Request #07_563',
      Time_elapsed: '2 minutes ago',
      Seen: false,
      Background: '#EDFDFF',
    },
    {
      Notification_details: 'Landlord updated: Service Request #07_563',
      Time_elapsed: '2 minutes ago',
      Seen: false,
      Background: '#EDFDFF',
    },
  ]);

  // Handlers
  const handleRowClick = (event: MouseEvent<HTMLTableRowElement>, index: number): void => {
    event.preventDefault();

    // Update the "Seen" property for the clicked item
    const updatedTableData = [...tableData];
    updatedTableData[index].Seen = true;
    updatedTableData[index].Background = '#FFFFFF';
    setTableData(updatedTableData);
  };

  useEffect(() => {
    if (formState) {
      var newData = {
        Notification_details: 'Landlord updated: Service Request #07_563',
        Time_elapsed: '2 minutes ago',
        Seen: false,
        Background: 'bg-tableHover',
      };
      setTableData((tableData) => [...tableData, newData]);
    }
  }, [formState, Notification_details, Time_elapsed, Seen, Background]);

  return (
    <React.Fragment>
      {/* // When user is not logged in */}
      {user === null ? (
        <Navigate to="/401" replace={true} />
      ) : (
        <React.Fragment>
          {/* // When user is logged in */}
          {user?.typ !== null ? (
            <div className="flex justify-center items-center">
              <div className="container mx-auto mt-10 mb-10 h-156 w-656">
                <div className="bg-white h-full overflow-y-auto rounded-lg drop-shadow-2xl">
                  <table className="table-auto w-full">
                    <thead>
                      <tr>
                        <th className="px-4 py-2 bg-tableHeader text-2xl text-left">
                          Notification
                        </th>
                      </tr>
                    </thead>
                    <tbody className="">
                      {tableData.map((row) => (
                        <tr
                          className="hover:bg-tableHover hover:shadow-lg"
                          key={row.Notification_details}
                          bgcolor={row.Background}
                          onClick={(event) => handleRowClick(event, tableData.indexOf(row))}
                        >
                          <td className="pb-10 pt-5 py-2 px-5 text-left">
                            <div className="flex">
                              <span
                                className={`mt-5 w-2 h-2 rounded-full justify-center ${
                                  row.Seen ? 'bg-transparent' : 'bg-activeField'
                                }`}
                              ></span>
                              <div className="ml-10 text-lg">{row.Notification_details}</div>
                            </div>
                          </td>
                          <td className="px-5 py-2">{row.Time_elapsed}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          ) : (
            // When user is logged in but for some reason shouldnt have access
            <Navigate to="/403" replace={true} />
          )}
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default TenantDashboard;
