import React from 'react';

function AverageRating({reviewsAboutMeArr}) {
  let scoreTotal = 0;
  let one = 0;
  let two = 0;
  let three = 0;
  let four = 0;
  let five = 0;
  if (reviewsAboutMeArr) {
    reviewsAboutMeArr.forEach(review => {
      scoreTotal += review.rating;
      if (review.rating === 1) {
        one += 1;
      }
      else if (review.rating === 2) {
        two += 1;
      }
      else if (review.rating === 2) {
        three += 1;
      }
      else if (review.rating === 2) {
        four += 1;
      }
      else {
        five += 1;
      }
    })
  }
  let responseTotal = one + two + three + four + five;
  let average = scoreTotal / responseTotal;
  return (
    <h2>Rating: {average ? average.toFixed(1) : null}</h2>
  );
}

export default AverageRating;
