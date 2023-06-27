import { ChangeEvent, FC, useState } from 'react'

interface InputProps {
  link : string
  label: string
  padding_right: string
  value: boolean
  name: string
  error: boolean
  disabled?: boolean
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

const TermsConditionsCheckbox: FC<InputProps> = ({
  link,
  label,
  padding_right,
  value,
  name,
  error,
  disabled,
  onChange,
}) => {
  const [checked, setChecked] = useState(false);
  const handleClick = () => { 
    setChecked(!checked);
  };

    return (
        <div className="flex flex-col text-left input-wrapper">
          <label style={{ paddingRight: padding_right + 'px' }} className="pr-4  mb-3 font-medium text-headerText" htmlFor={label}>{label}</label>
          <span className='inline-flex justify-left'>
          <input id="checkbox" className="accent-inputField w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-gray-500 focus:ring-1"
            type="checkbox"
            checked={value}
            name={name}
            onChange={onChange}
            disabled={disabled}
            />
          <label htmlFor={label} className="ml-2 text-sm font-medium text-headerText">I agree with the <a href={link} className="text-blue-600 dark:text-blue-500 hover:underline">terms and conditions</a>.</label></span>
          {/* <input className="w-2/3 text-headerText bg-inputField disabled:bg-disabledField disabled:text-disabledText font-light rounded pl-2 py-1 px-5
          focus:outline-none focus:border-sky-500 focus:ring-1 focus:bg-userNameButton focus:ring-sky-500 focus:caret-sky-500
          invalid:border-pink-500 invalid:text-pink-600 invalid:caret-pink-500
          focus:invalid:border-pink-500 focus:invalid:ring-pink-500 focus:invalid:caret-pink-500"
            type={type}
            id={label}
            value={value}
            name={name}
            placeholder={placeholder}
            onChange={onChange}
            disabled={disabled}
          /> */}
          {error && <p className="error">Input field can't be empty!</p>}
        </div>
      )
    }
export default TermsConditionsCheckbox;