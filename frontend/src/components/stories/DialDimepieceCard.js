import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { articleActions } from "../../redux/article-slice";
import { cartActions } from "../../redux/cart-slice";

function DialDimepieceCard({ story }) {
  const nav = useNavigate();
  const dispatch = useDispatch();

  return (
    <div
      className="dial-dimepiece-card"
      onClick={() => {
        nav(`/stories/${story.category.replaceAll(" ", "-")}/${story._id}`);
        dispatch(articleActions.setIsArticleLoaded(false));
        dispatch(cartActions.hideSearch());
      }}
    >
      <div className="dial-dimepiece-card-left">
        <img
          loading="lazy"
          src={story.coverImage.asset.url}
          alt={story.title}
        />
      </div>
      <div className="dial-dimepiece-card-right">
        <p className="dial-dimepiece-title">{story.title}</p>
        <p className="dial-dimepiece-discussed">{story.previewDescription}</p>
        <button
          style={{ fontSize: ".75rem" }}
          className="most-discussed-preview-button"
          onClick={() => {
            nav(`/stories/${story.category.replaceAll(" ", "-")}/${story._id}`);
            dispatch(cartActions.hideSearch());
          }}
        >
          Read More
        </button>
      </div>
    </div>
  );
}

export default DialDimepieceCard;
