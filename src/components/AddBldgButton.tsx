import { FC } from 'react';

interface InputProps {
  type: React.ButtonHTMLAttributes<HTMLButtonElement>['type'];
  label: string;
  handleClick: any;
}

const AddBldgButton: FC<InputProps> = ({ type, label, handleClick }) => {
  return (
    <div className="flex align-left text-left input-wrapper pl-2">
      <button
        onClick={handleClick}
        className="flex items-center justify-center py-1 px-1 border border-white bg-white font-small text-[#3180BA] rounded drop-shadow-md"
      >
        {label}
      </button>
    </div>
  );
};
export default AddBldgButton;
