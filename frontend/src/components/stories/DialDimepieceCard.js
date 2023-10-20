import React from "react";

function DialDimepieceCard({ story }) {
  const dateObject = new Date(story._createdAt);
  const options = { year: "numeric", month: "short", day: "numeric" };
  const formattedDate = dateObject.toLocaleDateString("en-US", options);
  return (
    <div className="dial-dimepiece-card">
      <div className="dial-dimepiece-card-left">
        <img src={story.coverImage.asset.url} alt={story.title} />
      </div>
      <div className="dial-dimepiece-card-right">
        <p className="blue dial-dimepiece-card-date">
          {formattedDate.toUpperCase()}
        </p>
        <div className="dial-dimepiece-card-headers">
          <p>Fave watch under $1k to start out a higher-tier collection?</p>
          <p>Mary-Kate or Ashley?</p>
          <p>How should I pick a watch?</p>
          <p>Do I wear my Tank Française while working out?</p>
          <p>Is/will Grand Seiko be heirloom quality?</p>
          <p>How should I pick a watch?</p>
        </div>
      </div>
    </div>
  );
}

export default DialDimepieceCard;
