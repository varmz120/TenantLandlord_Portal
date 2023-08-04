import { ChangeEvent, FC } from 'react';

interface MultiSelectProps {
  label: string;
  padding_right: string;
  options: string[];
  selectedOptions: string[]; // Array of selected options
  onChange: (selectedOptions: string[]) => void; // Function to handle changes
}

const MultiSelectField: FC<MultiSelectProps> = ({
  label,
  padding_right,
  options,
  selectedOptions,
  onChange,
}) => {
  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    const optionValue = e.target.value;
    if (e.target.checked) {
      onChange([...selectedOptions, optionValue]);
    } else {
      onChange(selectedOptions.filter((option) => option !== optionValue));
    }
  };

  return (
    <div className="flex flex-col text-left">
      <label
        style={{ paddingRight: padding_right + 'px' }}
        className="pr-4 font-medium text-headerText"
        htmlFor={label}
      >
        {label}
      </label>
      {options.map((option) => (
        <div key={option} className="flex items-center mb-2">
          <input
            type="checkbox"
            value={option}
            checked={selectedOptions.includes(option)}
            onChange={handleCheckboxChange}
            className="mr-2"
          />
          <span>{option}</span>
        </div>
      ))}
    </div>
  );
};

export default MultiSelectField;
