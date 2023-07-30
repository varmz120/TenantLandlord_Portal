import { ChangeEvent, FC } from 'react';

interface InputProps {
  type: 'text' | 'number' | 'email' | 'password';
  label: string;
  padding_right: string;
  value: string;
  name: string;
  error: string;
  disabled?: boolean;
  layout: string;
  classnames: string;
  options: string[];
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
}

const DropdownField: FC<InputProps> = ({
  type,
  label,
  padding_right,
  value,
  name,
  error,
  layout,
  classnames,
  options, // TODO: Pass in from MongoDB list of categories
  disabled,
  onChange,
}) => {
  return (
    <div className={'flex text-left ' + (layout === 'vertical' ? 'flex-col' : '')}>
      <label
        style={{ paddingRight: padding_right + 'px' }}
        className="pr-4 font-medium text-headerText"
        htmlFor={label}
      >
        {label}
      </label>
      <select
        disabled={disabled}
        name={name}
        onChange={onChange}
        value={value}
        className={
          'mt-2 bg-inputField text-sm md:text-base text-placeholderText focus:outline-none focus:border-sky-599 focus:ring-1 focus:bg-userNameButton focus:ring-sky-500 font-light rounded py-1 px-2 text-left inline-flex items-center ' +
          classnames
        }
      >
        <option
          disabled
          selected
          key={0}
          value=""
          hidden
          className="z-50 text-white font-light bg-gray-500 divide-y divide-gray-100 rounded shadow w-48"
        >
          Select here
        </option>
        {options.map((option) => (
          <option
            key={option}
            value={option}
            className="z-50 text-white font-light bg-gray-500 divide-y divide-gray-100 rounded shadow w-48"
          >
            {option}
          </option>
        ))}
        ;
      </select>
      {error && <p className="error text-red-500">{error}</p>}
    </div>
  );
};
export default DropdownField;
