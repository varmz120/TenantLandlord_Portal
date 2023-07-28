import { MouseEvent, FC } from 'react';

interface InputProps {
  value: string;
  padding_right: string | number;
  type: string;
  toggle: boolean;
  firstViewState: boolean;
  onClick: (event: MouseEvent<HTMLButtonElement>) => void;
}

const ActionButton: FC<InputProps> = ({
  value,
  padding_right,
  type,
  toggle,
  firstViewState,
  onClick,
}) => {
  let className = '';
  let icon = '';

  // TODO: Add View Quote button option here
  switch (type) {
    case 'accept': {
      className =
        'w-24 ' +
        (toggle && !firstViewState
          ? 'text-headerText border-[#BEDCB5] bg-[#BEDCB5]'
          : 'text-[#6BC04E] border-[#6BC04E] hover:text-headerText');
      break;
    }
    case 'reject': {
      className =
        'w-24 ' +
        (toggle && !firstViewState
          ? 'text-[#4D2E2E] border-[#EBB3B0] bg-[#EBB3B0]'
          : 'text-[#EB4841] border-[#EB4841] hover:text-[#4D2E2E]');
      break;
    }
    case 'download': {
      className =
        'w-40 text-headerText border-button hover:text-textActive hover:border-buttonActive hover:bg-buttonActive pr-2 mx-auto my-5';
      icon =
        "bg-50 bg-left bg-no-repeat bg-[url('./images/download_icon.svg')] group-hover:bg-[url('./images/download_icon_dark.svg')]";
      break;
    }
    case 'edit': {
      className =
        '!mr-3 !h-7  w-20 rounded bg-[#e5e7eb] border-[#e5e7eb] hover:bg-[#BEDCB5] items-center';
      icon = " bg-50 h-5 !mt-1 bg-left bg-no-repeat bg-[url('./images/pencil_edit_icon.svg')]";
      break;
    }
    case 'delete': {
      className = ' !h-7 w-20 rounded bg-[#e5e7eb] border-[#e5e7eb] hover:bg-[#c95f5b] ';
      icon = " bg-50 h-5  !mt-1  bg-left bg-no-repeat bg-[url('./images/delete.svg')] ";
      break;
    }
    case 'edit': {
      className =
        '!mr-3 !h-7  w-20 rounded bg-[#e5e7eb] border-[#e5e7eb] hover:bg-[#BEDCB5] items-center';
      icon = " bg-50 h-5 !mt-1 bg-left bg-no-repeat bg-[url('./images/pencil_edit_icon.svg')]";
      break;
    }
    case 'delete': {
      className = ' !h-7 w-20 rounded bg-[#e5e7eb] border-[#e5e7eb] hover:bg-[#c95f5b] ';
      icon = " bg-50 h-5  !mt-1  bg-left bg-no-repeat bg-[url('./images/delete.svg')] ";
      break;
    }
    default: {
      className =
        'w-32 text-headerText border-button hover:text-textActive border-button hover:border-buttonActive hover:bg-buttonActive';
      break;
    }
  }

  return (
    <div style={{ paddingLeft: padding_right }} className="flex">
      <button type="button" name={type} onClick={onClick} className={className}>
        {icon ? <div className={'inline-block w-6 h-3 ml-2 ' + icon}></div> : null}
        {value}
      </button>
    </div>
  );
};

export default ActionButton;
