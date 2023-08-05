import { MouseEvent, FC } from 'react';

interface InputProps {
  value: string;
  padding_right: string | number;
  type: string;
  disabled: boolean;
  onClick: (event: MouseEvent<HTMLButtonElement>) => void;
}

const ActionUnassignButton: FC<InputProps> = ({
  value,
  padding_right,
  type,
  disabled,
  onClick,
}) => {
  let className = '';
  let icon = '';

  switch (type) {
    case 'unassign': {
      className="block rounded flex border-solid text-white enabled:text-headerText border-1 px-10 py-5 m-4 flex justify-center items-center enabled:hover:text-textActive enabled:border-button enabled:hover:border-buttonActive enabled:hover:bg-buttonActive disabled:bg-disabledField"
      disabled = disabled;
      break;
    }
    default: {
      className ='w-32 text-headerText border-button hover:text-textActive border-button hover:border-buttonActive hover:bg-buttonActive';
      break;
    }
  }

  return (
    <div style={{ paddingLeft: padding_right + 'px' }} className="flex">
      <button
        type="button"
        name={type}
        id="action"
        value={value}
        onClick={onClick}
        disabled={disabled}
        className={'h-8 rounded-md border-[1px] text-sm group ' + className}
      >
        {icon ? <div className={'inline-block w-6 h-3 ml-2 ' + icon}></div> : null}
        {value}
      </button>
    </div>
  );
};

export default ActionUnassignButton;
