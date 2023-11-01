import React from "react";
import { useNavigate } from "react-router-dom";

function LatestStoriesCard({ story }) {
  const dateObject = new Date(story.datePublished);
  const options = { year: "numeric", month: "short", day: "numeric" };
  const formattedDate = dateObject.toLocaleDateString("en-US", options);
  const nav = useNavigate();

  return (
    <div
      className={
        story.mostDiscussed ? "most-discussed-card" : "latest-story-card"
      }
      onClick={() => {
        if (!story.mostDiscussed)
          nav(`/stories/${story.category.replaceAll(" ", "-")}/${story._id}`);
      }}
    >
      <div className="latest-story-card-top">
        <img className="" src={story.coverImage.asset.url} alt={story.title} />
      </div>
      <div className="latest-story-card-bottom">
        <div className="latest-story-card-bottom-left">
          <p className="blue">{story.category.toUpperCase()}</p>
          <p className="latest-story-card-date">
            {formattedDate.toUpperCase()}
          </p>
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
              <button
                className="most-discussed-preview-button"
                onClick={() =>
                  nav(
                    `/stories/${story.category.replaceAll(" ", "-")}/${
                      story._id
                    }`
                  )
                }
              >
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
