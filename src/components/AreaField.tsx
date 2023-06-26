import { ChangeEvent, FC, useRef } from 'react'

interface InputProps {
  label: string
  padding_right: string | number
  value: string 
  name: string
  placeholder: string
  layout : string
  classnames : string
  disabled?: boolean
}

const AreaField: FC<InputProps> = ({
  label,
  padding_right,
  value,
  name,
  placeholder,
  layout,
  classnames,
  disabled,
}) => {
  let editStatus = (disabled == true ? false : true);
  let pointerEventStatus = (disabled == true ? 'none' as React.CSSProperties["pointerEvents"] : 'auto' as React.CSSProperties["pointerEvents"])
  return (
    <div className={"text-left justify-left input-wrapper " + (layout == 'vertical' ? 'flex-col ' : ' ') + (classnames)}>
      <label style={{ paddingRight: padding_right + 'px' }} className="font-medium text-headerText" htmlFor={label}>{label}</label>
      <div style={{pointerEvents: pointerEventStatus}} className={"mt-2 flex-1 box-border w-3/5 h-24 font-light p-1 rounded focus:outline-none " + (disabled == true ? 'text-disabledText bg-disabledField caret-transparent cursor-default' : 'bg-inputField cursor-pointer')} 
      contentEditable={editStatus} spellCheck={editStatus} autoCorrect="off" autoCapitalize='off'>
      {value}
      </div>
    </div>
  )
}

export default AreaField;