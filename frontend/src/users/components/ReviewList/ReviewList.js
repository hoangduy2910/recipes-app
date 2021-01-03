import React from "react";

import ReviewItem from "../ReviewItem/ReviewItem";

const DUMMY_REVIEWS = [
  {
    userId: "1",
    username: "S. Pettit",
    image: "uploads/images/user-default.png",
    rating: "1",
    date: "11/28/2020",
    content:
      "Recipe is excellent espeically if you are making something with egg white and need something to do with the yolks. Next time I would not use the rum at all and let anyone add it if they wish. I only used 3/4 cup and it was too much. Really good otherwise.",
  },
  {
    userId: "2",
    username: "S. Pettit",
    image: "uploads/images/user-default.png",
    rating: "2",
    date: "11/28/2020",
    content:
      "Recipe is excellent espeically if you are making something with egg white and need something to do with the yolks. Next time I would not use the rum at all and let anyone add it if they wish. I only used 3/4 cup and it was too much. Really good otherwise.",
  },
  {
    userId: "3",
    username: "S. Pettit",
    image: "uploads/images/user-default.png",
    rating: "3",
    date: "11/28/2020",
    content:
      "Recipe is excellent espeically if you are making something with egg white and need something to do with the yolks. Next time I would not use the rum at all and let anyone add it if they wish. I only used 3/4 cup and it was too much. Really good otherwise.",
  },
  {
    userId: "4",
    username: "S. Pettit",
    image: "uploads/images/user-default.png",
    rating: "4",
    date: "11/28/2020",
    content:
      "Recipe is excellent espeically if you are making something with egg white and need something to do with the yolks. Next time I would not use the rum at all and let anyone add it if they wish. I only used 3/4 cup and it was too much. Really good otherwise.",
  },
  {
    userId: "5",
    username: "S. Pettit",
    image: "uploads/images/user-default.png",
    rating: "5",
    date: "11/28/2020",
    content:
      "Recipe is excellent espeically if you are making something with egg white and need something to do with the yolks. Next time I would not use the rum at all and let anyone add it if they wish. I only used 3/4 cup and it was too much. Really good otherwise.",
  },
];

const ReviewList = (props) => {
  const reviewList = DUMMY_REVIEWS.map((review, idx) => (
    <ReviewItem
      key={idx}
      userId={review.userId}
      username={review.username}
      image={review.image}
      rating={review.rating}
      date={review.date}
      content={review.content}
    />
  ));

  return <div>{reviewList}</div>;
};

export default React.memo(ReviewList);
