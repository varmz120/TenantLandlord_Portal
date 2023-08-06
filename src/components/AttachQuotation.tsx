import { ChangeEvent, FC } from 'react';
import uploadIcons from '../images/upload_icon.svg';

interface InputProps {
  label: string;
  padding_left: string;
  value: any;
  name: string;
  error: string;
  disabled?: boolean;
  filenames: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

const UploadField: FC<InputProps> = ({
  label,
  name,
  error,
  padding_left,
  disabled,
  filenames,
  onChange,
}) => {
  return (
    <div className="flex flex-col justify-right w-full">
      <label
        style={{ paddingLeft: padding_left + 'px' }}
        className="flex pr-4 font-medium text-headerText"
        htmlFor={label}
      >
        {label}
      </label>
      <span className="flex items-center">
        <label
          htmlFor="dropzone-file"
          className="mt-2 py-2 rounded cursor-pointer bg-disabledField"
        >
          <div className="flex flex-col items-center">
            <img src={uploadIcons} className="ml-24" alt="Upload Icon" />
          </div>
          <input
            disabled={disabled}
            id="dropzone-file"
            name={name}
            type="file"
            className="hidden overflow-hidden z-1 "
            onChange={onChange}
          />
        </label>
        <p className="pt-2 pl-2 font-light text-sm ">
            <li className="inline-block overflow-hidden px-2"> {filenames} </li>;
        </p>
      </span>
      <p className="mt-2 text-left text-xs text-gray-500 font-light">
        <span className="font-semibold">! Click to upload</span> PDF, PNG, or JPG (MAX. 10 MB).
      </p>
      {error && <p className="error text-red-500">{error}</p>}
    </div>
  );
};
export default UploadField;
