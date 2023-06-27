import { ChangeEvent, FC, useState } from 'react'

interface InputProps {
  type: 'text' | 'number' | 'email' | 'password'
  label: string
  padding_right: string
  value: string
  name: string
  placeholder: string
  error: boolean
  disabled?: boolean
  layout: string
  classnames : string
  options : string[]
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
  options,
  disabled,
  onChange,
}) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(!open);
  };

  const [selectedOption, setSelectedOption] = useState('');
  const handleSelect = (option : string) => {
    setSelectedOption(option);
    setOpen(!open);
    console.log(selectedOption);
  };

  return (
    <div className={"flex text-left " +  (layout == 'vertical' ? 'flex-col' : '')} >
      <label style={{ paddingRight: padding_right + 'px' }} className="pr-4 font-medium text-headerText" htmlFor={label}>{label}</label>      
      <select name={name} onChange={onChange} value={value} className={"mt-2 w-2/5 bg-inputField text-placeholderText focus:outline-none active: font-light rounded py-1 px-2 text-left inline-flex items-center " + classnames}> // typescript will still flag even if onChange has both types...
        <option value="" disabled selected className='z-50 text-white font-light bg-gray-500 divide-y divide-gray-100 rounded shadow w-48'>Select an option</option>
      {options.map(option => (
        <option key={option} value={option} className='z-50 text-white font-light bg-gray-500 divide-y divide-gray-100 rounded shadow w-48'>
          {option}
        </option>
      ))}
    </select>
   </div>
    // <div className={"flex align-center text-left " +  (layout == 'vertical' ? 'flex-col' : '')} >
    //   <label style={{ paddingRight: padding_right + 'px' }} className="pr-4 font-medium text-headerText" htmlFor={label}>{label}</label>      
    //   <button onClick={handleOpen} id="dropdownHoverButton" className={"mt-2 w-2/5 bg-inputField text-placeholderText focus:outline-none active: font-light rounded py-1 px-2 text-center inline-flex items-center" + classnames} type="button">
    //   { selectedOption ? selectedOption : "Click Me"}
    //   <svg className="h-4 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg></button>
    //   <div id="dropdownHover" className="z-50 bg-gray-400 divide-y divide-gray-100 rounded shadow w-48">
    //     { open ? (
    //       <ul className="py-2 text-sm text-gray-200" aria-labelledby="dropdownHoverButton">
    //       {options?.map(option => (
    //         <li value={option} onClick={() => handleSelect(option)} onChange={onChange}>
    //           <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">{option}</a>
    //         </li>
    //       ))}</ul>
    //     ) : null }
    //   </div>
  //   </div>
  )
}
export default DropdownField;