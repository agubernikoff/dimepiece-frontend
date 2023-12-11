import React from "react";
import { useNavigate } from "react-router-dom";
import { articleActions } from "../../redux/article-slice";
import { useDispatch } from "react-redux";
import { cartActions } from "../../redux/cart-slice";

function MobileDialDimepieceCard({ story }) {
  const nav = useNavigate();
  const dispatch = useDispatch();

  return (
    <div
      className="mobile-dial-dimepiece-card"
      onClick={() => {
        nav(`/stories/${story.category.replaceAll(" ", "-")}/${story._id}`);
        dispatch(articleActions.setIsArticleLoaded(false));
        dispatch(cartActions.hideSearch());
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
        <p className="mobile-latest-story-card-title">{story.title}</p>
        <p>{story.previewDescription}</p>
        <button>Read More</button>
      </div>
    </div>
  );
}

export default MobileDialDimepieceCard;
