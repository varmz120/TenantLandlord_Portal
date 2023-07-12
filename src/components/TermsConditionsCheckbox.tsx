import { ChangeEvent, FC, useState } from 'react'

interface InputProps {
  link : string
  label: string
  padding_right: string
  value: boolean
  name: string
  error: string
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
    return (
        <div className="flex flex-col text-left input-wrapper">
          <label style={{ paddingRight: padding_right + 'px' }} className="pr-4  mb-3 font-medium text-headerText" htmlFor={label}>{label}</label>
          <span className='inline-flex justify-left'>
          <input id="checkbox" className="w-4 h-4 text-blue-600 border-gray-300 rounded bg-gray-200 focus:outline-none focus:border-sky-500 focus:ring-1 "
            type="checkbox"
            checked={value}
            name={name}
            onChange={onChange}
            disabled={disabled}
            />
          <label htmlFor={label} className="ml-2 text-sm font-medium text-headerText">I agree with the <a href={link} className="text-blue-600 dark:text-blue-500 hover:underline">terms and conditions</a>.</label></span>
          {error && <p className="error text-red-500">{error}</p>}
        </div>
      )
    }
export default TermsConditionsCheckbox;