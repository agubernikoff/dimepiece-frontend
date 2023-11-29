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
        <p>{story.title}</p>
        <p>{story.mostDiscussedDescription}</p>
        <button>Read More</button>
      </div>
    </div>
  );
}

export default DialDimepieceCard;
