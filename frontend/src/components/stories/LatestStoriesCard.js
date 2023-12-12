import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { articleActions } from "../../redux/article-slice";
import { cartActions } from "../../redux/cart-slice";

function LatestStoriesCard({ story, mostDiscussed }) {
  const dateObject = new Date(story.datePublished);
  const options = { year: "numeric", month: "short", day: "numeric" };
  const formattedDate = dateObject.toLocaleDateString("en-US", options);
  const nav = useNavigate();
  const dispatch = useDispatch();

  return (
    <div
      className={mostDiscussed ? "most-discussed-card" : "latest-story-card"}
      onClick={() => {
        nav(`/stories/${story.category.replaceAll(" ", "-")}/${story._id}`);
        dispatch(articleActions.setIsArticleLoaded(false));
        dispatch(cartActions.hideSearch());
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
        {!mostDiscussed ? (
          <div className="latest-story-card-bottom-left">
            <p className="blue">{story.category.toUpperCase()}</p>
            <p className="latest-story-card-date">
              {formattedDate.toUpperCase()}
            </p>
          </div>
        ) : null}
        <div className="latest-story-card-bottom-right">
          <p
            style={
              mostDiscussed ? { fontSize: "clamp(42px, 1.8vw, 1.8rem)" } : null
            }
            className="latest-story-card-title"
          >
            {story.title}
          </p>
          {mostDiscussed ? (
            <>
              <p className="most-discussed-preview">
                {story.previewDescription}
              </p>
              <button
                className="most-discussed-preview-button"
                onClick={() => {
                  nav(
                    `/stories/${story.category.replaceAll(" ", "-")}/${
                      story._id
                    }`
                  );
                  dispatch(cartActions.hideSearch());
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
