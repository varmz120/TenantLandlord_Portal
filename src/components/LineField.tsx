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
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

const LineField: FC<InputProps> = ({
  type,
  label,
  padding_right,
  value,
  name,
  placeholder,
  error,
  disabled,
  onChange,
}) => {
  return (
    <div className="w-3/5 flex align-center text-left input-wrapper">
      <label style={{ paddingRight: padding_right + 'px' }} className="pr-4 font-medium text-headerText" htmlFor={label}>{label}</label>
      <input className="text-headerText w-2/5 disabled:bg-disabledField disabled:text-disabledText text-thin rounded pl-1"
        type={type}
        id={label}
        value={value}
        name={name}
        placeholder={placeholder}
        onChange={onChange}
        disabled={disabled}
      />
      {error && <p className="error">Input field can't be empty!</p>}
    </div>
  )
}
export default LineField;