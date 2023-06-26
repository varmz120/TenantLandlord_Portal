import { ChangeEvent, FC } from 'react'

interface InputProps {
  type: 'text' | 'number' | 'email' | 'password'
  label: string
  padding_right: string
  value: string | number
  name: string
  placeholder: string
  error: boolean
  disabled?: boolean
  layout: string
  classnames : string
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

const DropdownField: FC<InputProps> = ({
  type,
  label,
  padding_right,
  value,
  name,
  placeholder,
  error,
  layout,
  classnames,
  disabled,
  onChange,
}) => {
  return (
    <div className={"flex align-center text-left " +  (layout == 'vertical' ? 'flex-col' : '')} >
      <label style={{ paddingRight: padding_right + 'px' }} className="pr-4 font-medium text-headerText" htmlFor={label}>{label}</label>
      <button id="dropdownHoverButton" data-dropdown-toggle="dropdownHover" data-dropdown-trigger="hover" className={"mt-2 text-headerText bg-inputField focus:outline-none active: font-medium rounded text-sm py-2 px-4 text-center inline-flex items-center pl-[80px] " + classnames} type="button">
        {/* Click me  */}
        <svg className="w-4 h-4 ml-2" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg></button>
      <div id="dropdownHover" className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
        <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownHoverButton">
          <li>
            <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Dashboard</a>
          </li>
          <li>
            <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Settings</a>
          </li>
          <li>
            <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Earnings</a>
          </li>
          <li>
            <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Sign out</a>
          </li>
        </ul>
      </div>
      {/* <input className="text-headerText bg-inputField disabled:bg-disabledField disabled:text-disabledText font-light rounded pl-1 
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
      />
      {error && <p className="error">Input field can't be empty!</p>} */}
    </div>
  )
}
export default DropdownField;