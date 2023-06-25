import { FC, useState } from 'react'
import alertImg from '../images/alertImg.svg'

interface InputProps {
    label: string
    value: string
    padding_right : string | number
    alert: boolean
  }
  
  const ActionRequired: FC<InputProps> = ({
    label,
    value, // button title
    padding_right,
    alert,
  }) => {
    return (
      <div style={{ paddingLeft: padding_right + 'px' }} className="flex flex-col align-center text-left input-wrapper">
        <span className='w-full flex justify-start items-baseline'><label className="text-lg font-medium text-headerText" htmlFor={label}>{label}</label><img src={alertImg} className="pl-3 h-4 $'{alert === true ? 'visible' : 'invisible'}'"></img></span>
        <button type="button" className="text-headerText my-6 w-32 h-8 rounded-md border-button border-[1px] text-sm hover:bg-buttonActive hover:text-textActive hover:border-buttonActive">{value}</button>
      </div>
    )
  }
  
  export default ActionRequired;