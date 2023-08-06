import { MouseEvent, FC } from 'react';

interface InputProps {
  value: string;
  padding_right: string | number;
  type: string;
  toggle: boolean;
  disabled: boolean;
  firstViewState: boolean;
  onClick: (event: MouseEvent<HTMLButtonElement>) => void;
}

const ActionButton: FC<InputProps> = ({
  value,
  padding_right,
  type,
  toggle,
  disabled,
  firstViewState,
  onClick,
}) => {
  let className = '';
  let icon = '';

  switch (type) {
    default: {
      className =
        'w-32 text-headerText';
        disabled = disabled;
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
        className={'h-8 rounded-md border-[1px] text-sm group ' + className}
      >
        {icon ? <div className={'inline-block w-6 h-3 ml-2 ' + icon}></div> : null}
        {value}
      </button>
    </div>
  );
};

export default ActionButton;
