import { FC } from 'react';

interface InputProps {
  link: string;
  message_type: number;
}

const ReturnToHomePage: FC<InputProps> = ({
  link, message_type,
}) => {
  if( message_type === 1) {
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
  if( message_type === 2) {
    return (
      <div className="flex flex-col text-left input-wrapper">
        <span className="inline-flex justify-left">
          <label className="ml-2 text-sm font-medium text-headerText">
            Or if you got nothing to do {' '}
            <a href={link} className="text-blue-600 dark:text-blue-500 hover:underline"> {/* For memes , please delete LOL */}
              read this
            </a>
            {' '}. 😁
          </label>
        </span>
      </div>
    );
  };
};
export default ReturnToHomePage;
