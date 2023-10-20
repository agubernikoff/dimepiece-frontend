import React from "react";

function LatestStoriesCard({ story }) {
  const dateObject = new Date(story._createdAt);
  const options = { year: "numeric", month: "short", day: "numeric" };
  const formattedDate = dateObject.toLocaleDateString("en-US", options);
  return (
    <div
      className={
        story.mostDiscussed ? "most-discussed-card" : "latest-story-card"
      }
    >
      <div className="latest-story-card-top">
        <img className="" src={story.coverImage.asset.url} alt={story.title} />
      </div>
      <div className="latest-story-card-bottom">
        <div className="latest-story-card-bottom-left">
          <p className="blue">{story.category.toUpperCase()}</p>
          <p className="latest-story-card-date">{formattedDate}</p>
        </div>
        <div className="latest-story-card-bottom-right">
          <p className="latest-story-card-title">{story.title}</p>
          {story.mostDiscussed ? (
            <>
              <p className="most-discussed-preview">
                I first met Joanna on the Las Vegas strip, her effortless
                glamour only accentuated against the backdrop of the consumerist
                desert wasteland. She was wearing a perfectly tailored, hot pink
                suit set fresh off of the plane from New York, and I was
                instantly struck at how someone could look so chic after a
                cross-country flight...
              </p>
              <button className="most-discussed-preview-button">
                Read More
              </button>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default LatestStoriesCard;
