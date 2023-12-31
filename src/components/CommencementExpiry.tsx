import { ChangeEvent, FC } from 'react';

interface InputProps {
  label1: string;
  padding_right: string;
  value: string | number;
  name: string;
  placeholder: string;
  error: string;
  disabled?: boolean;
  layout: string;
  classnames: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const LineField: FC<InputProps> = ({
  label1,
  padding_right,
  value,
  name,
  placeholder,
  error,
  disabled,
  classnames,
  onChange,
}) => {
  return (
    <div className="flex">
      <div className={'flex align-center text-left input-wrapper pr-10'}>
        <div className="grid grid-cols-1">
          <label
            style={{ paddingRight: padding_right + 'px' }}
            className="pr-4 font-medium text-headerText"
            htmlFor={label1}
          >
            {label1}
          </label>
          <input
            className={
              'mt-2 text-headerText bg-inputField disabled:bg-disabledField disabled:text-disabledText font-light rounded pl-2 py-1 px-2 focus:outline-none focus:border-sky-500 focus:ring-1 focus:bg-userNameButton focus:ring-sky-500 focus:caret-sky-500 invalid:border-pink-500 invalid:text-pink-600 invalid:caret-pink-500 focus:invalid:border-pink-500 focus:invalid:ring-pink-500 focus:invalid:caret-pink-500 ' +
              classnames
            }
            type='datetime-local'
            id={label1}
            value={value}
            name={name}
            placeholder={placeholder}
            onChange={onChange}
            disabled={disabled}
          />
        </div>
        {error && <p className="error text-red-500">{error}</p>}
      </div>
    </div>
  );
};
export default LineField;
