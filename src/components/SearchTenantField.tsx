import { FC, SetStateAction, useEffect, MouseEvent, ChangeEvent } from 'react';
import { useState } from 'react';

interface InputProps {
  type: 'text';
  layout: string;
  error: string;
  data: { value: string; label: string }[];
  formValue: string;
  onClick: (event: MouseEvent<HTMLInputElement>) => void;
  onBlur: (event: MouseEvent<HTMLInputElement>) => void;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const SearchField: FC<InputProps> = ({
  formValue,
  onChange,
  onClick,
  onBlur,
  data,
  layout,
  error,
}) => {
  const [options, setListData] = useState([{ value: '', label: '' }]);
  const [value, setValue] = useState('');
  const [isOptionSelected, setIsOptionSelected] = useState(false);

  const onChangeLocal = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setValue(newValue);
    // console.log(newValue);
    setIsOptionSelected(false);
  };

  const onSearch = (searchTerm: SetStateAction<string>) => {
    setValue(searchTerm);
    setIsOptionSelected(true);
  };

  const loadData = () => {
    setListData(data);
  };

  useEffect(() => {
    loadData();
  }, [loadData]);

  return (
    <div
      className={
        'flex align-center text-left input-wrapper py-3' + (layout === 'vertical' ? 'flex-col' : '')
      }
    >
      <label style={{ paddingRight: 90 }} className="pr-4 font-medium text-headerText">
        Tenant
      </label>
      <div className="search-container">
        <div className="flex flex-center search-inner">
          <input
            className="border border-gray rounded-lg"
            type="text"
            value={formValue}
            name="formTenantID"
            onChange={(event) => {
              onChange(event);
              onChangeLocal(event);
            }}
            onClick={onClick}
            onMouseDown={onBlur}
          />
        </div>
        {!isOptionSelected ? (
          <div className="dropdown">
            {options
              .filter((options) => {
                const searchTerm = value.toLowerCase();
                const option = options.label.toLowerCase();

                return searchTerm && option.includes(searchTerm) && option !== searchTerm;
              })
              .slice(0, 10)

              .map((options) => (
                <div
                  onClick={() => onSearch(options.label)}
                  className="dropdown-row"
                  key={options.label}
                  id="formTenantID"
                >
                  {options.label}
                </div>
              ))}
          </div>
        ) : null}
      </div>
      {error && !isOptionSelected && <p className="error text-red-500">{error}</p>}
    </div>
  );
};
export default SearchField;
