import React, { useState, useContext, MouseEvent, useEffect } from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import Navbar from '../components/Navbar';
import LandlordNavbar from '../components/LandlordNavbar';
import { client } from '../client';

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

  const [formattedNotifications, setFormattedNotifications] = useState([
    {
      Notification_details: '',
      Time_elapsed: '',
      Seen: false,
      Background: '#EDFDFF',
    },
  ]);

  const handleRowClick = (event: MouseEvent<HTMLTableRowElement>, index: number): void => {
    event.preventDefault();

  };


  useEffect(() => {
    if (user) {
      const fetchNotifications = async () => {
        try {
          const response = await client.service('users').get(user._id);
          const notifications = response.notifications || [];
          const formattedNotifications = notifications.map((notification) => ({
            Notification_details: notification.text,
            Time_elapsed: timeElapsed(notification.timestamp),
            Seen: false,
            Background: '#EDFDFF',
          }));
          setFormattedNotifications(formattedNotifications);
        } catch (error) {
          console.error('Error fetching notifications:', error);
        }
      };
      fetchNotifications();
      window.addEventListener("focus", fetchNotifications);

      return () => window.removeEventListener('focus', fetchNotifications);
    }
  }, [user]);

  return (
    <React.Fragment>
      {/* // When user is not logged in */}
      {user === null ? (
        <Navigate to="/401" replace={true} />
      ) : (
        <React.Fragment>
          {/* // When user is logged in */}
          {user?.typ !== null ? (
            <div> {user?.typ === 2 ? (<LandlordNavbar></LandlordNavbar>) : (<Navbar></Navbar>)}
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
