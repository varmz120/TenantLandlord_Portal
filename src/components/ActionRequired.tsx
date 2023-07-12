import { FC, useState } from 'react'
import alertImg from '../images/alertImg.svg'

interface InputProps {
    label: string
    padding_right : string | number
    alert: boolean
}
  
const ActionRequired: FC<InputProps> = ({
    label,
    padding_right,
    alert,
  }) => {
    return (
      <div style={{ paddingLeft: padding_right + 'px' }} className="flex align-center text-left mb-2">
        <span className='w-full flex justify-start items-baseline'><label className="text-lg font-medium text-headerText" htmlFor={label}>{label}</label><img src={alertImg} className={"pl-3 h-4 " + (alert == true ? 'visible' : 'invisible')}></img></span>
      </div>
    )
  }
  
  export default ActionRequired;