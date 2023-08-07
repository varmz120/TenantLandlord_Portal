import { MouseEvent, FC, useState } from 'react';

interface InputProps {
  label: string;
  padding_right: string;
  disabled: boolean;
  rating: number;
  error: string;
  // handleClick: (event: MouseEvent<HTMLButtonElement>) => void;
  
  handleClick: (rating: number) => void;
}

// Source : https://dev.to/michaelburrows/create-a-custom-react-star-rating-component-5o6
const StarRating: FC<InputProps> = ({ label, padding_right, rating, error, disabled, handleClick }) => {
  const [hover, setHover] = useState(0);
  return (
    <div className="flex align-left text-left input-wrapper">
      <label
        style={{ paddingRight: padding_right + 'px' }}
        className="pr-4 font-medium text-headerText"
        htmlFor={label}
      >
        {label}
      </label>
      {[...Array(5)].map((star, index) => {
        index += 1;
        return (
          <button
            type="button"
            disabled={disabled}
            key={index}
            className={index <= (hover || rating) ? 'text-starActive' : 'text-placeholderText'}
            onClick={() => handleClick(index)}
            onMouseEnter={() => setHover(index)}
            onMouseLeave={() => setHover(rating)}
          >
            <span className="star" id={index.toString()}>
              &#9733;
            </span>
          </button>
        );
      })}
      {error && <p className="pl-2 error text-red-500">{error}</p>}
    </div>
  );
};
export default StarRating;
