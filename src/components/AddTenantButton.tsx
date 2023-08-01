import { FC } from 'react'

interface InputProps {
  type: React.ButtonHTMLAttributes<HTMLButtonElement>["type"]
  label: string 
  handleClick : any
}

const AddTenantButton: FC<InputProps> = ({
   type,
   label,
   handleClick,
  }) => {
    return (
      <div className="flex align-left text-left input-wrapper pl-2" >
        <button type={type} name='' onClick={handleClick} onSubmit={handleClick} className='inline-block align-middle py-1 px-1 border border-white bg-white font-small text-[#3180BA] rounded drop-shadow-md'>
        {label}
        </button>
    </div>
    )
  }
  export default AddTenantButton;