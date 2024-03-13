import React from "react";
import { useNavigate } from "react-router-dom";
import { articleActions } from "../../redux/article-slice";
import { useDispatch } from "react-redux";
import { cartActions } from "../../redux/cart-slice";
import { getAnalytics, logEvent } from "firebase/analytics";

function MobileLatestStoriesCard({ story }) {
  const nav = useNavigate();
  const dispatch = useDispatch();
  const analytics = getAnalytics();

  return (
    <div className="mobile-latest-story-card">
      <img
        loading="lazy"
        className=""
        src={story.coverImage.asset.url}
        alt={story.title}
        onClick={() => {
          logEvent(analytics, "select_content", {
            content_type: "Article",
            content_id: story.title,
          });
          nav(`/stories/${story.category.replaceAll(" ", "-")}/${story._id}`);
          dispatch(articleActions.setIsArticleLoaded(false));
          dispatch(cartActions.hideSearch());
        }}
      />
      <p
        onClick={() => {
          logEvent(analytics, "select_content", {
            content_type: "Article",
            content_id: story.title,
          });
          nav(`/stories/${story.category.replaceAll(" ", "-")}/${story._id}`);
          dispatch(articleActions.setIsArticleLoaded(false));
          dispatch(cartActions.hideSearch());
        }}
        className="mobile-latest-story-card-title"
      >
        {story.title}
      </p>
      <p
        onClick={() => {
          nav(`/stories/${story.category.replaceAll(" ", "-")}/${story._id}`);
          dispatch(articleActions.setIsArticleLoaded(false));
          dispatch(cartActions.hideSearch());
        }}
        className="mobile-most-discussed-preview"
      >
        {story.previewDescription}
      </p>
    </div>
  );
}

export default MobileLatestStoriesCard;
