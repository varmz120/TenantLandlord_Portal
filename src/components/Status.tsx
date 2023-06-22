import { FC, useState } from 'react'
import openTicket from '../images/OpenTicketStatus.svg'

interface InputProps {
    label: string
    value: string
    padding_right : string | number
  }
  
  const Status: FC<InputProps> = ({
    label,
    value, // where all my uris gonna be?
    padding_right,
  }) => {
    const statuses : {[key: string]: string} = {
        "Opened" : openTicket
    }
    return (
      <div className="flex flex-col align-center text-left input-wrapper">
        <label style={{ paddingRight: padding_right + 'px' }} className="text-lg font-medium text-headerText" htmlFor={label}>{label}</label>
        <img className="my-8 w-1/2" src={statuses[value]}/>
      </div>
    )
  }
  
  export default Status;