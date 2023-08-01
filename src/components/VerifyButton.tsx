import { FC } from 'react';

interface InputProps {
  type: React.ButtonHTMLAttributes<HTMLButtonElement>['type'];
  label: string;
  handleClick: any;
}

const VerifyButton: FC<InputProps> = ({ type, label, handleClick }) => {
  return (
    <div className="flex align-left text-left input-wrapper">
      <button
        type={type}
        onClick={handleClick}
        onSubmit={handleClick}
        className="bg-[#335B77] rounded-lg mt-24 h-12 text-2xl font-bold text-white p-1"
      >
        {label}
      </button>
    </div>
  );
};
export default VerifyButton;
