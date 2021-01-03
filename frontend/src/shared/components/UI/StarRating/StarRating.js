import React from "react";

const StarRating = (props) => {
  let starRating;
  if (props.initialRating >= 0) {
    starRating = [...Array(5)].map((_, idx) => {
      const ratingValue = idx + 1;

      return (
        <label key={idx}>
          {!props.isShow && (
            <input
              type="radio"
              name="rating"
              style={{ display: "none" }}
              value={ratingValue}
              onClick={() => props.onClick(ratingValue)}
            />
          )}
          <i
            className={`fas fa-star ${props.className}`}
            style={
              ratingValue <= props.initialRating
                ? { color: "#c85621" }
                : { color: "#e4e5e9" }
            }
          />
        </label>
      );
    });
  }

  return <div>{starRating}</div>;
};

export default React.memo(StarRating);
