import { useState, MouseEvent, useEffect } from 'react';
import filterIcon from '../images/filter_icon.svg';
import filterDarkIcon from '../images/filter_icon_dark.svg';
import ActionButton from '../components/ActionButton';
import { useNavigate, useLocation } from 'react-router-dom';

const TenantDashboard = () => {
  // Navigation & routing
  const navigate = useNavigate();
  const locate = useLocation();
  var formState = locate.state ? locate.state.formState : null; // Temporary -> for demo purposes w/o backend
  var title = locate.state ? formState.formTitle : ''; // Temporary -> for demo purposes w/o backend
  var category = locate.state ? formState.formCategory : ''; // Temporary -> for demo purposes w/o backend
  var ticket_ID = locate.state ? formState.formID : ''; // Temporary -> for demo purposes w/o backend
  var ticket_status = locate.state ? formState.formStatus : ''; //Temporary -> for demo purposes w/o backend
  var isClosed = locate.state ? locate.state.isClosed : null; // Temporary -> for demo purposes w/o backend

  // UseStates & Backend Data
  const [filterActive, setFilter] = useState(false);
  const [filterValue, setFilterValue] = useState('');
  // Mock static values
  const [tableData, setTableData] = useState([
    { ID: 1, Item: 'Fix Floor', Category: 'Repair', Date: ' 01/11/22 ', Status: ' Closed ', Landlord: ' Mr. Smoy ' },
    { ID: 2, Item: 'Fix Floor', Category: 'Repair', Date: ' 17/12/22 ', Status: ' Closed ', Landlord: ' Mr. Smoy ' },
    {
      ID: 3,
      Item: 'Pest Control',
      Category: 'Cleanliness',
      Date: ' 22/12/22 ',
      Status: ' Closed ',
      Landlord: ' Mrs. Lima ',
    },
    {
      ID: 4,
      Item: 'Pest Control',
      Category: 'Cleanliness',
      Date: ' 17/07/23 ',
      Status: ' Closed ',
      Landlord: ' Mrs. Lima ',
    },
  ]);

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
    console.log(filterActive);
  };

  useEffect(() => {
    if (formState) {
      var newData = {
        ID: ticket_ID,
        Item: title,
        Category: category,
        Date: ' ',
        Status: ticket_status,
        Landlord: ' Pending ',
      };
      setTableData((tableData) => [...tableData, newData]);
    }
  }, [formState, category, ticket_ID, ticket_status, title]);

  const handleRowClick = (event: MouseEvent<HTMLTableRowElement>): void => {
    event.preventDefault();

    if (ticket_status === 'Pending Approval') {
      navigate('viewDetails', { state: { formState, isSubmit: true, isClosed } });
    } else {
      navigate('viewDetails', { state: { formState, isSubmit: false, isClosed } });
    }
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
                (filterActive ? 'bg-activeField' : 'bg-userNameButton hover:bg-buttonActive')
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
                placeholder="Filter by Item"
                className="border border-gray-300 rounded px-4 py-2"
              />
              {filterValue && (
                <span className="mt-4 text-sm text-gray-500">(Filtered by {filterValue})</span>
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
                <th className="border px-4 py-2 bg-tableHeader text-userNameText">Category</th>
                <th className="border px-4 py-2 bg-tableHeader text-userNameText">Date</th>
                <th className="border px-4 py-2 bg-tableHeader text-userNameText">Status</th>
                <th className="border px-4 py-2 bg-tableHeader text-userNameText">Landlord</th>
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
                .map((row) => (
                  <tr
                    className="hover:bg-tableHover hover:shadow-lg"
                    key={row.ID}
                    onClick={handleRowClick}
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
  );
};

export default TenantDashboard;
