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

const FormField: FC<InputProps> = ({
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
    <div className="text-left input-wrapper">
      <label style={{ paddingRight: '32px' }} className="pr-4 font-medium text-headerText" htmlFor={label}>{label}</label>
      <input className="disabled:bg-disabledField disabled:text-fieldText text-light rounded pl-2 text-base"
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
export default FormField;