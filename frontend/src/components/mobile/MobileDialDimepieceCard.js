import React from "react";
import { useNavigate } from "react-router-dom";

function MobileDialDimepieceCard({ story }) {
  const dateObject = new Date(story._createdAt);
  const options = { year: "numeric", month: "short", day: "numeric" };
  const formattedDate = dateObject.toLocaleDateString("en-US", options);
  const nav = useNavigate();

  const mappedSubheaders = story.dialDimepieceSubheaders.map((subheader, i) => (
    <p key={i}>{subheader}</p>
  ));

  return (
    <div
      className="mobile-dial-dimepiece-card"
      onClick={() => {
        nav(`/stories/${story.category.replaceAll(" ", "-")}/${story._id}`);
      }}
    >
      <div className="mobile-dial-dimepiece-card-left">
        <img
          loading="lazy"
          src={story.coverImage.asset.url}
          alt={story.title}
        />
      </div>
      <div className="mobile-dial-dimepiece-card-right">
        <p className="blue dial-dimepiece-card-date">
          {formattedDate.toUpperCase()}
        </p>
        <div className="mobile-dial-dimepiece-card-headers">
          {mappedSubheaders}
        </div>
      </div>
    </div>
  );
}

export default MobileDialDimepieceCard;
