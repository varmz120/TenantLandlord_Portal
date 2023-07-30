import React, { useState, useEffect } from 'react';
import trashBinIcon from '../../images/trash_bin_icon.svg';
import addServiceProviderIcon from '../../images/add_service_provider_icon.svg';
import filterIcon from '../../images/filter_icon.svg';
import pencilEditIcon from '../../images/pencil_edit_icon.svg';
import { useNavigate } from 'react-router-dom';

interface Props {
  clicked: boolean;
  handleClick: () => void;
}

const TenantAccounts = ({ clicked, handleClick }: Props) => {
  const [tableData, setTableData] = useState([
    { ID: '', Email: '', LeaseID: '' },
    // { ID: '1', Email: 'john@example.com', LeaseID: 'XYZ789' },
    // { ID: '2', Email: 'jane@example.com', LeaseID: 'UVW123' },
    // { ID: '3', Email: 'alex@example.com', LeaseID: 'LMN456' },
    // { ID: '4', Email: 'sam@example.com', LeaseID: 'PQR789' },
    // { ID: '5', Email: 'emily@example.com', LeaseID: 'STU012' },
    // { ID: '6', Email: 'chris@example.com', LeaseID: 'VWX345' },
    // { ID: '7', Email: 'lisa@example.com', LeaseID: 'YZA678' },
    // { ID: '8', Email: 'matt@example.com', LeaseID: 'BCD901' },
    // { ID: '9', Email: 'sarah@example.com', LeaseID: 'EFG234' },
    // { ID: '10', Email: 'alexander@example.com', LeaseID: 'HIJ567' },
    // { ID: '11', Email: 'olivia@example.com', LeaseID: 'KLM890' },
    // { ID: '12', Email: 'ryan@example.com', LeaseID: 'NOP123' },
    // { ID: '13', Email: 'natalie@example.com', LeaseID: 'QRS456' },
    // { ID: '14', Email: 'daniel@example.com', LeaseID: 'TUV789' },
    // { ID: '15', Email: 'sophia@example.com', LeaseID: 'WXY012' },
  ]);

  const navigate = useNavigate();
  const userType = 'Tenant';

  const [initialRender, setInitialRender] = useState(true);

  // Define a type for the column names
  type TableColumn = 'ID' | 'Email' | 'LeaseID';

  // Update the state and event handler with the TableColumn type
  const [searchInputs, setSearchInputs] = useState<Record<TableColumn, string>>({
    ID: '',
    Email: '',
    LeaseID: '',
  });

  // Implement Filter function for table
  const [filteredTableData, setFilteredTableData] = useState(tableData);

  const handleSearchInputChange = (column: TableColumn, value: string) => {
    setSearchInputs((prevState) => ({
      ...prevState,
      [column]: value,
    }));

    const filteredData = tableData.filter((row) => {
      const rowValue = row[column].toString().toLowerCase();
      const searchValue = value.toLowerCase();
      return rowValue.includes(searchValue);
    });

    setFilteredTableData(filteredData);
  };

  //Implement Clear Filter function for table
  const handleClearFilters = () => {
    setSearchInputs({
      ID: '',
      Email: '',
      LeaseID: '',
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

  const handleCheck = (itemId: string) => {
    if (checked.includes(itemId)) {
      setChecked((prevItems) => prevItems.filter((id) => id !== itemId));
    } else {
      setChecked((prevItems) => [...prevItems, itemId]);
    }
  };

  // Function for delete row
  const deleteRow = (rowId: string[]) => {
    let copy = [...tableData];
    copy = copy.filter((row) => !rowId.includes(row.ID));
    setTableData(copy);
  };

  //Component for filter buttons

  const loadTenantData = () => {
    console.log('Loading Tenant Data...');
    // Perform actions specific to tenants data loading
    let TenantData = [
      { ID: '1', Email: 'john@example.com', LeaseID: 'XYZ789' },
      { ID: '2', Email: 'jane@example.com', LeaseID: 'UVW123' },
      { ID: '3', Email: 'alex@example.com', LeaseID: 'LMN456' },
      { ID: '4', Email: 'sam@example.com', LeaseID: 'PQR789' },
      { ID: '5', Email: 'emily@example.com', LeaseID: 'STU012' },
      { ID: '6', Email: 'chris@example.com', LeaseID: 'VWX345' },
      { ID: '7', Email: 'lisa@example.com', LeaseID: 'YZA678' },
      { ID: '8', Email: 'matt@example.com', LeaseID: 'BCD901' },
      { ID: '9', Email: 'sarah@example.com', LeaseID: 'EFG234' },
      { ID: '10', Email: 'alexander@example.com', LeaseID: 'HIJ567' },
      { ID: '11', Email: 'olivia@example.com', LeaseID: 'KLM890' },
      { ID: '12', Email: 'ryan@example.com', LeaseID: 'NOP123' },
      { ID: '13', Email: 'natalie@example.com', LeaseID: 'QRS456' },
      { ID: '14', Email: 'daniel@example.com', LeaseID: 'TUV789' },
      { ID: '15', Email: 'sophia@example.com', LeaseID: 'WXY012' },
    ];
    setTableData(TenantData);
    setFilteredTableData(TenantData);
  };

  //on modify account button click
  const handleModifyAccount = (email: string) => {
    navigate('/AccountManagement', { state: { email, userType } });
  };

  useEffect(() => {
    if (initialRender) {
      loadTenantData();
      setInitialRender(false);
    }
  }, [initialRender]);

  return (
    <div className="h-auto bg-[#ECEDED] flex-1 ">
      <div
        className="flex items-center justify-between bg-[#31556F] rounded-t-lg drop-shadow-2xl"
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
            href="#"
            className="block rounded-full px-5 py-5 mr-4
                                        flex items-center bg-[#edfdff] active:text-[#cbe6ec] active:bg-[#193446] "
            onClick={toggleRowVisibility}
            style={{ width: '57px', height: '57px' }}
          >
            <img src={filterIcon} className="mx-auto scale-150" alt="?"></img>
          </a>
          <a /* Delete Button */
            href="#"
            className="block rounded-full px-5 py-5 mr-4
                                        flex items-center bg-[#edfdff] active:text-[#cbe6ec] active:bg-[#193446]"
            onClick={() => {
              deleteRow(checked);
              console.log(checked);
            }}
            style={{ width: '57px', height: '57px' }}
          >
            <img src={trashBinIcon} className="mx-auto scale-150" alt="?"></img>
          </a>
          <a /* Add Service Provider Icon Button */
            href="#"
            className="block rounded-full px-5 py-5 mr-4
                                        flex items-center bg-[#edfdff] active:text-[#cbe6ec] active:bg-[#193446] "
            style={{ width: '57px', height: '57px' }}
            onClick={handleClick}
          >
            <img src={addServiceProviderIcon} className="mx-auto scale-150" alt="?"></img>
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
        <table className="table-fixed w-full">
          <thead>
            <tr style={{ display: isRowVisible ? 'table-row' : 'none' }}>
              <th className="border w-1/12 px-2 py-2 bg-[gray] text-white"></th>

              <th className="border w-1/6 px-2 py-2 bg-[gray] text-white">
                <input
                  className="mx-2 px-2 w-28 text-center"
                  type="text"
                  value={searchInputs.ID}
                  onChange={(e) => handleSearchInputChange('ID', e.target.value)}
                  placeholder="Search ID"
                  style={{ color: 'gray' }}
                />
              </th>

              <th className="border w-auto px-2 py-2 bg-[gray] text-white">
                <input
                  className="mx-2 px-2 w-96"
                  type="text"
                  value={searchInputs.Email}
                  onChange={(e) => handleSearchInputChange('Email', e.target.value)}
                  placeholder="Search Email"
                  style={{ color: 'gray' }}
                />
              </th>

              <th className="border w-1/6 px-2 py-2 bg-[gray] text-white ">
                <input
                  className="mx-2 px-2 text-center w-40"
                  type="text"
                  value={searchInputs.LeaseID}
                  onChange={(e) => handleSearchInputChange('LeaseID', e.target.value)}
                  placeholder="Search Lease ID"
                  style={{ color: 'gray' }}
                />
              </th>

              <th className="border w-1/6 px-2 py-2 bg-[gray] text-white"></th>
            </tr>
            <tr>
              <th className="border w-1/12 px-4 py-2 bg-[#3180BA] text-white"></th>
              <th className="border w-1/12 px-4 py-2 bg-[#3180BA] text-white">ID</th>
              <th className="border w-auto px-4 py-2 bg-[#3180BA] text-white">Email</th>
              <th className="border w-1/12 px-4 py-2 bg-[#3180BA] text-white">Lease ID</th>
              <th className="border w-1/6 px-4 py-2 bg-[#3180BA] text-white">Actions</th>
            </tr>
          </thead>
          <tbody className="">
            {filteredTableData.map((row) => (
              <tr className="hover:bg-tableHover hover:shadow-lg" key={row.ID}>
                <td className="px-4 py-2">
                  <input
                    type="checkbox"
                    checked={checked.includes(row.ID)}
                    onChange={() => handleCheck(row.ID)}
                  />
                </td>
                <td className="px-2 py-2">{row.ID}</td>
                <td className="px-2 py-2">{row.Email}</td>
                <td className="px-2 py-2">{row.LeaseID}</td>
                <td className="w-auto px-2 mt-2 mx-0 mb-2 text-md flex justify-center items-center whitespace-nowrap">
                  <div
                    className="flex justify-center items-center border border-black rounded-xl px-4 py-1 mx-2 cursor-pointer"
                    onClick={() => handleModifyAccount(row.Email)}
                  >
                    <img className="mr-2" src={pencilEditIcon} />
                    <p>Modify Account</p>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TenantAccounts;
