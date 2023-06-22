import { FC, useState } from 'react'

interface InputProps {
    label: string
    value: string
    padding_right : string | number
  }
  
  const ActionRequired: FC<InputProps> = ({
    label,
    value, // where all my uris gonna be?
    padding_right,
  }) => {
    return (
      <div className="flex flex-col align-center text-left input-wrapper">
        <label style={{ paddingRight: padding_right + 'px' }} className="font-medium text-headerText" htmlFor={label}>{label}</label>
      </div>
    )
  }
  
  export default ActionRequired;