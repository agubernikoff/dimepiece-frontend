import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { articleActions } from "../../redux/article-slice";
import { cartActions } from "../../redux/cart-slice";

function DialDimepieceCard({ story }) {
  const dateObject = new Date(story._createdAt);
  const options = { year: "numeric", month: "short", day: "numeric" };
  const formattedDate = dateObject.toLocaleDateString("en-US", options);
  const nav = useNavigate();
  const dispatch = useDispatch();

  const mappedSubheaders = story.dialDimepieceSubheaders.map((subheader, i) => (
    <p key={i}>{subheader}</p>
  ));

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
        <p className="blue dial-dimepiece-card-date">
          {formattedDate.toUpperCase()}
        </p>
        <div className="dial-dimepiece-card-headers">{mappedSubheaders}</div>
      </div>
    </div>
  );
}

export default DialDimepieceCard;
