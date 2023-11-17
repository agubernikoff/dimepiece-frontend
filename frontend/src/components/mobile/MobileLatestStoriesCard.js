import React from "react";
import { useNavigate } from "react-router-dom";

function MobileLatestStoriesCard({ story }) {
  const nav = useNavigate();
  return (
    <div className="mobile-latest-story-card">
      <img
        loading="lazy"
        className=""
        src={story.coverImage.asset.url}
        alt={story.title}
        onClick={() => {
          nav(`/stories/${story.category.replaceAll(" ", "-")}/${story._id}`);
        }}
      />
      <p className="mobile-latest-story-card-title">{story.title}</p>
      <p className="mobile-most-discussed-preview">
        I first met Joanna on the Las Vegas strip, her effortless glamour only
        accentuated against the backdrop of the consumerist desert wasteland.
        She was wearing a perfectly tailored, hot pink suit set fresh off of the
        plane from New York, and I was instantly struck at how someone could
        look so chic after a cross-country flight...
      </p>
    </div>
  );
}

export default MobileLatestStoriesCard;
