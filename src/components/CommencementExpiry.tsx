import { ChangeEvent, FC } from 'react'

interface InputProps {
  type: 'text' | 'number' | 'email' | 'password'
  label1: string
  label2: string
  padding_right: string
  value: string | number
  name: string
  placeholder: string
  error: string
  disabled?: boolean
  layout: string
  classnames : string
  onChange: (event : ChangeEvent<HTMLInputElement>) => void
}

const LineField: FC<InputProps> = ({
  type,
  label1,
  label2,
  padding_right,
  value,
  name,
  placeholder,
  error,
  disabled,
  layout,
  classnames,
  onChange,
}) => {
  return (
    <div className='grid grid-cols-3 gap-x-3'>
    <div className={"flex align-center text-left input-wrapper "} >
    <div className='grid grid-cols-1'>
      <label style={{ paddingRight: padding_right + 'px' }} className="pr-4 font-medium text-headerText" htmlFor={label1}>{label1}</label>
      <input className={"mt-2 text-headerText bg-inputField disabled:bg-disabledField disabled:text-disabledText font-light rounded pl-2 py-1 px-5 focus:outline-none focus:border-sky-500 focus:ring-1 focus:bg-userNameButton focus:ring-sky-500 focus:caret-sky-500 invalid:border-pink-500 invalid:text-pink-600 invalid:caret-pink-500 focus:invalid:border-pink-500 focus:invalid:ring-pink-500 focus:invalid:caret-pink-500 " + classnames}
        type={type}
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

    <div className='flex justify-center pr-10'>
    <p> - </p>
    </div>

    <div className={"flex align-center text-left input-wrapper "} >
    <div className='grid grid-cols-1'>
    <label style={{ paddingRight: padding_right + 'px' }} className="pr-4 font-medium text-headerText" htmlFor={label2}>{label2}</label>
    <input className={"mt-2 text-headerText bg-inputField disabled:bg-disabledField disabled:text-disabledText font-light rounded pl-2 py-1 px-5 focus:outline-none focus:border-sky-500 focus:ring-1 focus:bg-userNameButton focus:ring-sky-500 focus:caret-sky-500 invalid:border-pink-500 invalid:text-pink-600 invalid:caret-pink-500 focus:invalid:border-pink-500 focus:invalid:ring-pink-500 focus:invalid:caret-pink-500 " + classnames}
      type={type}
      id={label2}
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
  )
}
export default LineField;