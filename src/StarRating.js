import { useState } from "react";

const starContainer = {
  display: "flex",
  alignItems: "center",
  gap: "12px",
};

const star = {
  display: "flex",
};

export default function StarRating({
  maxRating = 5,
  color = "#fcc432",
  size = 30,
  ratingDefault = 3,
  className = "",
  messages = [],
  setState,
}) {
  const [rate, setRate] = useState(ratingDefault);
  const [hover, setHover] = useState(0);
  function handleRate(rating) {
    setRate(rating);
    setState(rating);
  }

  const rateText = {
    margin: "0",
    lineHeight: "1",
    color,
    fontSize: `${size / 2 + 5}px`,
  };

  return (
    <div style={starContainer} className={className}>
      <div style={star}>
        {Array.from({ length: maxRating }, (_, i) => (
          <Stars
            key={i}
            onRate={() => handleRate(i + 1)}
            full={hover ? hover >= i + 1 : rate >= i + 1}
            handleIn={() => setHover(i + 1)}
            handleOut={() => setHover(0)}
            color={color}
            size={size}
          />
        ))}
      </div>
      <p style={rateText}>
        {messages.length === maxRating
          ? messages[hover ? hover - 1 : rate - 1]
          : hover || rate || ""}
      </p>
    </div>
  );
}

function Stars({ onRate, full, handleIn, handleOut, color, size }) {
  const starStyle = {
    width: `${size}px`,
    height: `${size}px`,
    cursor: "pointer",
    display: "block",
  };
  return (
    <span
      role="button"
      style={starStyle}
      onClick={onRate}
      onMouseEnter={handleIn}
      onMouseLeave={handleOut}
    >
      {full ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill={color}
          stroke={color}
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke={color}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="{2}"
            d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
          />
        </svg>
      )}
    </span>
  );
}
