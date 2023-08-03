import React, { useState, useContext, MouseEvent, useEffect } from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

const NotificationComponent = () => {
  const { user } = useContext(AuthContext);

  const timeElapsed = (timestamp) => {
    const currentTime = new Date().getTime();
    const difference = currentTime - timestamp; // difference in milliseconds
    const seconds = Math.floor((difference / 1000) % 60);
    const minutes = Math.floor((difference / (1000 * 60)) % 60);
    const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    if (days > 0) return `${days} days ago`;
    if (hours > 0) return `${hours} hours ago`;
    if (minutes > 0) return `${minutes} minutes ago`;
    return `${seconds} seconds ago`;
  };

  const initialFormattedNotifications = user?.notifications?.map((notification) => ({
    Notification_details: notification.text,
    Time_elapsed: timeElapsed(notification.timestamp),
    Seen: false,
    Background: '#EDFDFF',
  })) || [];

  const [formattedNotifications, setFormattedNotifications] = useState(initialFormattedNotifications);

  const handleRowClick = (event: MouseEvent<HTMLTableRowElement>, index: number): void => {
    event.preventDefault();

    // Update the "Seen" property for the clicked item
    const updatedNotifications = [...formattedNotifications];
    updatedNotifications[index].Seen = true;
    updatedNotifications[index].Background = '#FFFFFF';
    setFormattedNotifications(updatedNotifications);
  };

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
                      {formattedNotifications.map((notification, index) => (
                        <tr 
                          key={index} 
                          style={{backgroundColor: notification.Background}} 
                          onClick={(event) => handleRowClick(event, index)}
                        >
                          <td className="pb-10 pt-5 py-2 px-5 text-left">
                            <div className="flex">
                              <span className="mt-5 w-2 h-2 rounded-full justify-center bg-activeField"></span>
                              <div className="ml-10 text-lg">{notification.Notification_details}</div>
                            </div>
                          </td>
                          <td className="px-5 py-2">{notification.Time_elapsed}</td>
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

export default NotificationComponent;