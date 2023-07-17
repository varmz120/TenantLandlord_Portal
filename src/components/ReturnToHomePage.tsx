import { FC } from 'react';

interface InputProps {
  link: string;
}

const ReturnToHomePage: FC<InputProps> = ({
  link,
}) => {
  return (
    <div className="flex flex-col text-left input-wrapper">
      <span className="inline-flex justify-left">
        <label className="ml-2 text-sm font-medium text-headerText">
          Go back to {' '}
          <a href={link} className="text-blue-600 dark:text-blue-500 hover:underline"> {/* Add routing to either login page or dashboard depending on login status */}
            Dashboard or Login page
          </a>
          {' '} here!
        </label>
      </span>
    </div>
  );
};
export default ReturnToHomePage;
