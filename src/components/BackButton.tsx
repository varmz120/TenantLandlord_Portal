import { ButtonHTMLAttributes, FC, FormEventHandler } from 'react'

interface InputProps {
  type: React.ButtonHTMLAttributes<HTMLButtonElement>["type"]
  label: string 
  handleClick : any
}

const BackButton: FC<InputProps> = ({
   type,
   label,
   handleClick
  }) => {
    return (
      <div className="flex align-left text-left input-wrapper" >
        <span className='py-2'>
        <button type={type} onClick={handleClick} className='flex py-2 px-2 font-medium border-0 text-disabledText'>
        <svg aria-hidden="true" className="w-6 h-6 text-disabledText" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg> Back to {label}
        </button>
        </span>
    </div>
    )
  }
  export default BackButton;