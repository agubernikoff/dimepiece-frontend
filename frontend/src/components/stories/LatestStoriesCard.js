import React from "react";
import { useNavigate } from "react-router-dom";
import { scrollToTop } from "../../helpers/ScrollToTop";

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
        nav(`/stories/${story.category.replaceAll(" ", "-")}/${story._id}`);
        scrollToTop();
      }}
    >
      <div className="latest-story-card-top">
        <img
          loading="lazy"
          className=""
          src={story.coverImage.asset.url}
          alt={story.title}
        />
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
                {story.mostDiscussedDescription}
              </p>
              <button
                className="most-discussed-preview-button"
                onClick={() => {
                  nav(
                    `/stories/${story.category.replaceAll(" ", "-")}/${
                      story._id
                    }`
                  );
                  scrollToTop();
                }}
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
