import React from "react";

function LatestStoriesCard({ story }) {
  const dateObject = new Date(story._createdAt);
  const options = { year: "numeric", month: "short", day: "numeric" };
  const formattedDate = dateObject.toLocaleDateString("en-US", options);
  return (
    <div className="latest-story-card">
      <div className="latest-story-card-top">
        <img className="" src={story.coverImage.asset.url} alt={story.title} />
      </div>
      <div className="latest-story-card-bottom">
        <div className="latest-story-card-bottom-left">
          <p className="latest-story-card-category">
            {story.category.toUpperCase()}
          </p>
          <p className="latest-story-card-date">{formattedDate}</p>
        </div>
        <div className="latest-story-card-bottom-right">
          <p className="latest-story-card-title">{story.title}</p>
        </div>
      </div>
    </div>
  );
}

export default LatestStoriesCard;
