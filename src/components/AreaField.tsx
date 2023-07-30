import { ChangeEvent, FC } from 'react';

interface InputProps {
  label: string;
  padding_right: string | number;
  value: string;
  id: string;
  placeholder: string;
  layout: string;
  classnames: string;
  disabled?: boolean;
  error: string;
  onChange: (event: ChangeEvent<HTMLDivElement>) => void;
}

const AreaField: FC<InputProps> = ({
  label,
  padding_right,
  value, // TODO: Pass in from MongoDB value if displaying pre-filled information
  id,
  placeholder,
  layout,
  classnames,
  disabled,
  error,
  onChange,
}) => {
  let editStatus = disabled === true ? false : true;
  let pointerEventStatus =
    disabled === true
      ? ('none' as React.CSSProperties['pointerEvents'])
      : ('auto' as React.CSSProperties['pointerEvents']);
  return (
    <div
      className={
        'text-left justify-left input-wrapper ' +
        (layout === 'vertical' ? 'flex-col ' : 'flex ') +
        classnames
      }
    >
      <label
        style={{ paddingRight: padding_right + 'px' }}
        className="font-medium text-headerText"
        htmlFor={label}
      >
        {label}
      </label>
      <div
        style={{ pointerEvents: pointerEventStatus }}
        className={
          'mt-2 flex-1 box-border h-24 overflow-auto max-w-sm font-light pl-2 pt-1 rounded focus:outline-none focus:border-sky-599 focus:ring-1 focus:bg-userNameButton focus:ring-sky-500 focus:caret-sky-500 ' +
          (disabled === true
            ? 'text-disabledText bg-disabledField caret-transparent cursor-default'
            : 'bg-inputField cursor-pointer')
        }
        contentEditable={editStatus}
        spellCheck={editStatus}
        autoCorrect="off"
        autoCapitalize="off"
        placeholder={placeholder}
        onBlur={onChange}
        id={id}
      >
        {value}
      </div>
      {error && <p className="error text-red-500">{error}</p>}
    </div>
  );
};

export default AreaField;
