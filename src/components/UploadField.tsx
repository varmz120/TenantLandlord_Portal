import { ChangeEvent, FC } from 'react';
import uploadIcons from '../images/upload_icon.svg';

interface InputProps {
  label: string;
  padding_right: string;
  layout: string,
  value: any;
  name: string;
  error: string;
  disabled?: boolean;
  filenames: string[];
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

const UploadField: FC<InputProps> = ({
  label,
  name,
  layout,
  padding_right,
  error,
  disabled,
  filenames,
  onChange,
}) => {
  return (
    <div className={"flex justify-left w-full pt-2 " + (layout === 'vertical' ? 'flex-col' : 'flex-row')}>
      <label
        style={{ paddingRight: padding_right + 'px' }}
        className="flex font-medium text-headerText pt-2"
        htmlFor={label}
      >
        {label}
      </label>
      <span className={"flex items-center " + (layout === 'vertical' ? '' : 'w-[200px]')}>
        <label
          htmlFor="dropzone-file"
          className={"rounded cursor-pointer bg-disabledField " + (layout === 'vertical' ? 'mt-2 py-2 w-1/3' : 'py-2 pr-3')}
        >
          <div className={"flex items-center"}>
            <img src={uploadIcons} alt="Upload here" className={layout === 'vertical' ? "pl-44" : "pl-36"} />
          </div>
          <input
            disabled={disabled}
            id="dropzone-file"
            name={name}
            type="file"
            className="hidden overflow-hidden z-1"
            multiple
            accept='image/png, image/jpeg, application/pdf'
            onChange={onChange}
          />
        </label>
        {layout === 'vertical' ?
        <p className={"font-light text-sm text-left break-all " + (layout === 'vertical' ? 'pt-2 pl-2' : 'pl-2')}>
          {filenames.map((name: string) => {
            return <li className="inline-block md:w-64 overflow-hidden px-2"> {name} </li>;
          })}
        </p>: null}
      </span>
      <div className='flex flex-col'>
      <p className={"flex text-left text-xs text-gray-500 font-light " + (layout === "vertical" ? "py-2": "px-2")}>
        <span className="font-semibold">! Click to upload </span> PDF, PNG, or JPG (MAX. 10 MB).
      </p>
      {layout === '' ?
        <p className={"font-light text-sm text-left break-all " + (layout === "vertical" ? 'pt-2 pl-2' : 'pl-2')}>
          {filenames.map((name: string) => {
            return <li className="inline-block md:w-64 overflow-hidden px-1"> {name} </li>;
          })}
        </p>: null}
      {error && <p className="error text-red-500">{error}</p>}
      </div>
    </div>
  );
};
export default UploadField;
