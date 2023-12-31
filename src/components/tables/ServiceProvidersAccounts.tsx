import React, { useState, useEffect } from 'react';
import trashBinIcon from '../../images/trash_bin_icon.svg';
import addServiceProviderIcon from '../../images/add_service_provider_icon.svg';
import filterIcon from '../../images/filter_icon.svg';
import pencilEditIcon from '../../images/pencil_edit_icon.svg';
import { useNavigate } from 'react-router-dom';
import { client } from '../../client';

interface Props {
  clicked: boolean;
  handleClick: () => void;
  data: { ID: string; Email: string, BuildingID:string }[];
}

const ServiceProvidersAccounts = ({ clicked, handleClick ,data}: Props) => {
  const [tableData, setTableData] = useState([{ ID: '', Email: '', BuildingID: '' }]);
  const userType = 'Service Provider';

  const [initialRender, setInitialRender] = useState(true);
  const navigate = useNavigate();
  interface TableDataItem {
    ID: string;
    Email: string;
    BuildingID: string;
    
    
  }

  // Define a type for the column names
  type TableColumn = 'ID' | 'Email' | 'BuildingID';

  // Update the state and event handler with the TableColumn type
  const [searchInputs, setSearchInputs] = useState<Record<TableColumn, string>>({
    ID: '',
    Email: '',
    BuildingID: '',
  });

  // Implement Filter function for table
  const [filteredTableData, setFilteredTableData] = useState(data);

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

  const handleSearchInputChange = (column: TableColumn, value: string) => {
    setSearchInputs((prevState) => ({
      ...prevState,
      [column]: value,
    }));

    const filteredData = applyFilters(data, {
      ...searchInputs,
      [column]: value,
    });

    setFilteredTableData(filteredData);
  };

  //Implement Clear Filter function for table
  const handleClearFilters = () => {
    setSearchInputs({
      ID: '',
      Email: '',
      BuildingID: '',
    });

    setFilteredTableData(data);
  };

  //Implement Hidden Filter Row function for table
  const [isRowVisible, setIsRowVisible] = useState(false);

  const toggleRowVisibility = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
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
        await client.service('users').remove(Id);
      } catch (error) {
        console.error('Failed to delete account', error);
      }
    }
  };

  //Component for filter buttons

  const loadServiceProvidersData = () => {
    console.log('Loading Service Providers Data...');
    // Perform actions specific to Service Provider data loading
    let SPData = [
      { ID: '27', Email: 'ryan@example.com', BuildingID: 'NOP123' },
      { ID: '28', Email: 'natalie@example.com', BuildingID: 'QRS456' },
      { ID: '29', Email: 'daniel@example.com', BuildingID: 'TUV789' },
      { ID: '30', Email: 'sophia@example.com', BuildingID: 'WXY012' },
      { ID: '31', Email: 'emma@example.com', BuildingID: 'ZAB345' },
      { ID: '32', Email: 'nathan@example.com', BuildingID: 'CDE678' },
      { ID: '33', Email: 'mia@example.com', BuildingID: 'FGH901' },
      { ID: '34', Email: 'david@example.com', BuildingID: 'IJK234' },
      { ID: '35', Email: 'lily@example.com', BuildingID: 'LMN567' },
      { ID: '36', Email: 'ryan@example.com', BuildingID: 'OPQ890' },
      { ID: '37', Email: 'grace@example.com', BuildingID: 'RST123' },
      { ID: '38', Email: 'samuel@example.com', BuildingID: 'UVW456' },
      { ID: '39', Email: 'amelia@example.com', BuildingID: 'XYZ789' },
      { ID: '40', Email: 'jacob@example.com', BuildingID: 'ABC012' },
      { ID: '41', Email: 'sophie@example.com', BuildingID: 'DEF345' },
      { ID: '42', Email: 'ethan@example.com', BuildingID: 'GHI678' },
      { ID: '43', Email: 'ava@example.com', BuildingID: 'JKL901' },
      { ID: '44', Email: 'noah@example.com', BuildingID: 'MNO234' },
      { ID: '45', Email: 'mia@example.com', BuildingID: 'PQR567' },
      { ID: '46', Email: 'william@example.com', BuildingID: 'STU890' },
      { ID: '47', Email: 'olivia@example.com', BuildingID: 'VWX123' },
      { ID: '48', Email: 'benjamin@example.com', BuildingID: 'YZA456' },
      { ID: '49', Email: 'emily@example.com', BuildingID: 'BCD789' },
      { ID: '50', Email: 'mason@example.com', BuildingID: 'EFG012' },
      { ID: '51', Email: 'amelia@example.com', BuildingID: 'HIJ345' },
      { ID: '52', Email: 'harper@example.com', BuildingID: 'KLM678' },
      { ID: '53', Email: 'logan@example.com', BuildingID: 'NOP901' },
    ];
    setTableData(data);
    setFilteredTableData(data);
  };

  //on modify account button click
  const handleModifyAccount = (email: string, BuildingID: string, rowId: string) => {
    navigate('/AccountManagement', { state: { email, BuildingID, userType, rowId } });
  };

  useEffect(() => {
    if (initialRender) {
      loadServiceProvidersData();
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
            href="#/"
            className="block rounded-full px-5 py-5 mr-4
                                        flex items-center bg-[#edfdff] active:text-[#cbe6ec] active:bg-[#193446] "
            onClick={(e) => toggleRowVisibility(e)}
            style={{ width: '57px', height: '57px' }}
          >
            <img src={filterIcon} className="mx-auto scale-150" alt="?"></img>
          </a>
          <a /* Delete Button */
            href="#/"
            className="block rounded-full px-5 py-5 mr-4
                                        flex items-center bg-[#edfdff] active:text-[#cbe6ec] active:bg-[#193446]"
            onClick={(e) => {
              e.preventDefault();
              deleteRow(checked);
              console.log(checked);
            }}
            style={{ width: '57px', height: '57px' }}
          >
            <img src={trashBinIcon} className="mx-auto scale-150" alt="?"></img>
          </a>
          <a /* Add Service Provider Icon Button */
            href="#/"
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
                  value={searchInputs.BuildingID}
                  onChange={(e) => handleSearchInputChange('BuildingID', e.target.value)}
                  placeholder="Search BuildingID"
                  style={{ color: 'gray' }}
                />
              </th>

              <th className="border w-1/6 px-2 py-2 bg-[gray] text-white"></th>
            </tr>
            <tr>
              <th className="border w-1/12 px-4 py-2 bg-[#3180BA] text-white"></th>
              <th className="border w-1/12 px-4 py-2 bg-[#3180BA] text-white">ID</th>
              <th className="border w-auto px-4 py-2 bg-[#3180BA] text-white">Email</th>
              <th className="border w-1/6 px-4 py-2 bg-[#3180BA] text-white">Building ID</th>
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
                <td className="px-2 py-2">{row.BuildingID}</td>
                <td className="w-auto px-2 mt-2 mx-0 mb-2 text-md flex justify-center items-center whitespace-nowrap">
                  <div
                    className="flex justify-center items-center border border-black rounded-xl px-4 py-1 mx-2 cursor-pointer"
                    onClick={() => handleModifyAccount(row.Email, row.BuildingID, row.ID)}
                  >
                    <img className="mr-2" alt="pencil icon" src={pencilEditIcon} />
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

export default ServiceProvidersAccounts;
