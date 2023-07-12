import { FC, useState } from 'react';

interface InputProps {
  type: React.ButtonHTMLAttributes<HTMLButtonElement>["type"];
  label: string;
  handleClick: any;
}

const UploadQuotationButton: FC<InputProps> = ({
  type,
  label,
  handleClick,
}) => {
  const [noNeedQuotation, setNoNeedQuotation] = useState(false);

  const handleCheckboxChange = () => {
    setNoNeedQuotation(!noNeedQuotation);
  };

  return (
    <div className="flex justify-end input-wrapper">
      <label className="flex items-center">
        <input
          type="checkbox"
          checked={noNeedQuotation}
          onChange={handleCheckboxChange}
          className="mr-2"
        />
        No Need Quotation
      </label>
      <button
        type={type}
        onClick={handleClick}
        onSubmit={handleClick}
        className={`flex py-1 px-4 bg-${noNeedQuotation ? 'gray' : '[#31556F]'} font-medium text-white rounded`}
        disabled={noNeedQuotation}
      >
        {label}
      </button>
    </div>
  );
};

export default UploadQuotationButton;
