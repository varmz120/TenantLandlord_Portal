import { FC, useState } from 'react';

interface InputProps {
  type: 'checkbox';
  handleClick: any;
}

const UploadQuotationButton: FC<InputProps> = ({ type, handleClick }) => {
  const [noNeedQuotation, setNoNeedQuotation] = useState(false);

  const handleCheckboxChange = () => {
    setNoNeedQuotation(!noNeedQuotation);
  };

  return (
    <div className="flex justify-end input-wrapper">
      <label className="flex items-center pr-5">
        <input
          type="checkbox"
          checked={noNeedQuotation}
          onChange={handleCheckboxChange}
          className="mr-2"
        />
        No Need Quotation
      </label>
    </div>
  );
};

export default UploadQuotationButton;
