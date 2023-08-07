import { FC } from 'react';

interface InputProps {
  type: React.ButtonHTMLAttributes<HTMLButtonElement>['type'];
  label: string;
  handleClick: any;
}

const SubmitButton: FC<InputProps> = ({ type, label, handleClick }) => {
  return (
    <div className="flex align-left text-left input-wrapper">
      <button
        type={type}
        id={label}
        onClick={handleClick}
        onSubmit={handleClick}
        className="flex py-1 px-4 bg-navbar font-medium text-white rounded"
      >
        {label}
      </button>
    </div>
  );
};
export default SubmitButton;
