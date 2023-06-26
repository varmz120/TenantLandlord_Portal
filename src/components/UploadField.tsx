import { ChangeEvent, FC } from 'react'
import uploadIcons from '../images/upload_icon.svg'

interface InputProps {
  type: 'text' | 'number' | 'email' | 'password' | 'file'
  label: string
  padding_right: string
  value: string | number
  name: string
  placeholder: string
  error: boolean
  disabled?: boolean
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

const UploadField: FC<InputProps> = ({
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
    // <div className="flex flex-col gap-2 w-3/5 align-center text-left input-wrapper">
    //   <label style={{ paddingRight: padding_right + 'px' }} className="flex pr-4 font-medium text-headerText" htmlFor={label}>{label}</label>
    //   <input className="font-light text-sm rounded cursor-pointer focus:outline-none file:border-0 file:px-4 file:pr-8 file:py-2 file:text-headerText file:font-medium file:cursor-pointer file:bg-inputField"
    //     type={type}
    //     id={label}
    //     value={value}
    //     name={name}
    //     placeholder={placeholder}
    //     onChange={onChange}
    //     disabled={disabled}
    //   />
    //   {error && <p className="error">Input field can't be empty!</p>}
    //   <p className="mt-1 text-sm text-gray-400" id="file_input_help">SVG, PNG, JPG or GIF (MAX. SMTH MB).</p>
    // </div>
    <div className="flex flex-col justify-left w-full">
    <label style={{ paddingRight: padding_right + 'px' }} className="flex pr-4 font-medium text-headerText" htmlFor={label}>{label}</label>
    <label htmlFor="dropzone-file" className="mt-2 w-1/3 py-2 rounded cursor-pointer bg-disabledField">
        <div className="flex flex-col items-center">
          <img src={uploadIcons} className='ml-24'/>
        </div>
        <input id="dropzone-file" type="file" className="hidden" />
    </label>
    <p className="mt-2 text-left text-xs text-gray-500 font-light"><span className="font-semibold">! Click to upload</span> PDF, PNG, or JPG (MAX. 10 MB).</p>
  </div>
  )
}
export default UploadField;