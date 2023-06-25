import { ChangeEvent, FC, useRef } from 'react'

interface InputProps {
  label: string
  padding_right: string | number
  value: string 
  name: string
  placeholder: string
  disabled?: boolean
}

const AreaField: FC<InputProps> = ({
  label,
  padding_right,
  value,
  name,
  placeholder,
  disabled,
}) => {
  return (
    <div className="w-3/5 flex align-center text-left input-wrapper">
      <label style={{ paddingRight: padding_right + 'px' }} className="font-medium text-headerText" htmlFor={label}>{label}</label>
      <div style={{pointerEvents: 'none'}} className="box-border bg-disabledField w-3/5 text-disabledText text-thin p-1 rounded focus:outline-none cursor-default caret-transparent" contentEditable={!disabled} spellCheck={!disabled} autoCorrect="off" autoCapitalize='off'>
        {value}
      </div>
    </div>
  )
}

export default AreaField;