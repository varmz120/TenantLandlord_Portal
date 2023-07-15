import { MouseEvent, FC } from 'react'

interface InputProps {
    value : string
    padding_right : string | number
    type : string
    toggle : boolean
    firstViewState : boolean
    onClick : (event : MouseEvent<HTMLButtonElement>) => void
}
  
const ActionButton: FC<InputProps> = ({
    value,
    padding_right,
    type,
    toggle,
    firstViewState,
    onClick
  }) => {
    let className = "";
    let icon = "";

    switch(type) {
      case "accept": {
        className="w-24 " + (toggle && !firstViewState ? "text-headerText border-[#BEDCB5] bg-[#BEDCB5]" : "text-[#6BC04E] border-[#6BC04E] hover:text-headerText");
        break;
      } 
      case "reject": {
        className="w-24 " + (toggle && !firstViewState ? "text-[#4D2E2E] border-[#EBB3B0] bg-[#EBB3B0]" : "text-[#EB4841] border-[#EB4841] hover:text-[#4D2E2E]") ;
        break;
      }
      case "request": {
        className="w-40 text-userNameText border-button bg-userNameButton hover:text-textActive hover:border-activeField hover:bg-buttonActive mx-auto py-3 rounded";
        break;
      }
      case "download": {
        className="w-40 text-headerText border-button hover:text-textActive hover:border-buttonActive hover:bg-buttonActive pr-2 mx-auto my-5";
        icon="bg-50 bg-left bg-no-repeat bg-[url('./images/download_icon.svg')] group-hover:bg-[url('./images/download_icon_dark.svg')]"
        break;
      }
      // TODO: Fix slight icon placement
      case "quote": {
        className="w-32 text-headerText border-button hover:text-textActive hover:border-buttonActive hover:bg-buttonActive pr-2 ";
        icon="bg-left bg-no-repeat bg-[url('./images/quote_icon.svg')] group-hover:bg-[url('./images/quote_icon_dark.svg')] h-4 w-7"
        break;
      }
      default: {
        className="w-32 text-headerText border-button hover:text-textActive border-button hover:border-buttonActive hover:bg-buttonActive";
        break;
      }
    }

    return (
      <div style={{ paddingLeft: padding_right }} className="flex">
        <button type="button" name={type} onClick={onClick} className={className}>
          {icon ? (
          <div className={"inline-block w-6 h-3 ml-2 " + icon}>
          </div>
          ): null}
          {value}
          </button>
      </div>
    )
  }
  
  export default ActionButton;