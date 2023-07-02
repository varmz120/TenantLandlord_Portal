import { MouseEvent, FC, useState } from 'react'

interface InputProps {
  label: string 
  padding_right: string
  handleClick : (event : MouseEvent<HTMLButtonElement>) => void
}

// Source : https://dev.to/michaelburrows/create-a-custom-react-star-rating-component-5o6
const StarRating: FC<InputProps> = ({
   label,
   padding_right,
   handleClick,
  }) => {
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    return (
      <div className="flex align-left text-left input-wrapper" >
        <label style={{ paddingRight: padding_right + 'px' }} className="pr-4 font-medium text-headerText" htmlFor={label}>{label}</label>
        {[...Array(5)].map((star, index) => {
        index += 1;
        return (
          <button
            type="button"
            key={index}
            className={index <= (hover || rating) ? "text-starActive" : "text-placeholderText"}
            onClick={() => setRating(index)}
            onMouseEnter={() => setHover(index)}
            onMouseLeave={() => setHover(rating)}>
            <span className="star">&#9733;</span>
          </button>
        );
      })}
    </div>
    )
  }
  export default StarRating;