import { FC, useState } from 'react';

interface InputProps {
  label: string;
  value: string[] | number;
  padding_right: string | number;
}

const Gallery: FC<InputProps> = ({
  label,
  value, // TODO: Pass in from MongoDB dictionary of URIs
  padding_right,
}) => {
  const slides = [
    {
      // loop through values list to populate the gallery
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (slideIndex: number) => {
    setCurrentIndex(slideIndex);
  };

  return (
    <div className="flex align-center text-left input-wrapper">
      <label
        style={{ paddingRight: padding_right + 'px' }}
        className="font-medium text-headerText"
        htmlFor={label}
      >
        {label}
      </label>
      <div className="max-w-[320px] h-[210px] w-3/5 w-min-[120] h-min-[100] ml-5 relative group">
        <div
          style={{ backgroundImage: `url(${slides[currentIndex].url})` }}
          className="w-full h-full rounded-2xl bg-center bg-cover duration-500"
        ></div>
        <button
          type="button"
          onClick={prevSlide}
          className="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointers group focus:outline-none"
          data-carousel-prev
        >
          <span className="inline-flex items-center justify-center w-10 h-10 hover:bg-gray-200/60">
            <svg
              aria-hidden="true"
              className="w-6 h-6 text-arrow"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 19l-7-7 7-7"
              ></path>
            </svg>
            <span className="sr-only">Previous</span>
          </span>
        </button>
        <button
          type="button"
          onClick={nextSlide}
          className="absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
          data-carousel-next
        >
          <span className="inline-flex items-center justify-center w-10 h-10 hover:bg-gray-200/60">
            <svg
              aria-hidden="true"
              className="w-6 h-6 text-arrow"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 5l7 7-7 7"
              ></path>
            </svg>
            <span className="sr-only">Next</span>
          </span>
        </button>
        <div className="flex top-4 justify-center">
          {slides.map((slide, slideIndex) => (
            <div
              key={slideIndex}
              onClick={() => goToSlide(slideIndex)}
              className="text-2xl cursor-pointer"
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Gallery;
