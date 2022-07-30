import React from 'react';

function AverageRating({reviewsAboutMeArr}) {
  let scoreTotal = 0;
  if (reviewsAboutMeArr) {
    scoreTotal = reviewsAboutMeArr.reduce((prev, cur) => prev + cur.rating, 0);
  }
  let average = scoreTotal / reviewsAboutMeArr.length;
  return (
    <h2 id="profile-avg-rating-h2">Rating: {average ? average.toFixed(1) : 0}</h2>
  );
}

export default AverageRating;
