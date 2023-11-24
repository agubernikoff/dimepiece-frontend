import React from "react";
import { useNavigate } from "react-router-dom";
import { articleActions } from "../../redux/article-slice";
import { useDispatch } from "react-redux";

function MobileLatestStoriesCard({ story }) {
  const nav = useNavigate();
  const dispatch = useDispatch();

  return (
    <div className="mobile-latest-story-card">
      <img
        loading="lazy"
        className=""
        src={story.coverImage.asset.url}
        alt={story.title}
        onClick={() => {
          nav(`/stories/${story.category.replaceAll(" ", "-")}/${story._id}`);
          dispatch(articleActions.setIsArticleLoaded(false));
        }}
      />
      <p className="mobile-latest-story-card-title">{story.title}</p>
      <p className="mobile-most-discussed-preview">
        {story.mostDiscussedDescription}
      </p>
    </div>
  );
}

export default MobileLatestStoriesCard;
