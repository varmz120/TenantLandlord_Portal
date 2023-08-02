import { FC } from 'react';

interface InputProps {
  type: React.ButtonHTMLAttributes<HTMLButtonElement>['type'];
  label: string;
  handleClick: any;
}

const UploadQuotationButton: FC<InputProps> = ({ type, label, handleClick }) => {
  return (
    <div className="flex flex-end input-wrapper">
      <button
        type={type}
        onClick={handleClick}
        onSubmit={handleClick}
        className="flex py-1 px-4 bg-[#31556F] font-medium text-white rounded"
      >
        {label}
      </button>
    </div>
  );
};
export default UploadQuotationButton;
