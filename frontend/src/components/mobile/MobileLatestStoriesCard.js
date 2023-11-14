import React from "react";

function MobileLatestStoriesCard({ story }) {
  return (
    <div className="mobile-latest-story-card">
      <img
        loading="lazy"
        className=""
        src={story.coverImage.asset.url}
        alt={story.title}
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
