import React from "react";
import { useNavigate } from "react-router-dom";
import { articleActions } from "../../redux/article-slice";
import { useDispatch } from "react-redux";
import { cartActions } from "../../redux/cart-slice";

function MobileDialDimepieceCard({ story }) {
  const dateObject = new Date(story._createdAt);
  const options = { year: "numeric", month: "short", day: "numeric" };
  const formattedDate = dateObject.toLocaleDateString("en-US", options);
  const nav = useNavigate();
  const dispatch = useDispatch();

  // const mappedSubheaders = story.dialDimepieceSubheaders.map((subheader, i) => (
  //   <p key={i}>{subheader}</p>
  // ));

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
        {/* <p className="blue dial-dimepiece-card-date">
          {formattedDate.toUpperCase()}
        </p> */}
        {/* <div className="mobile-dial-dimepiece-card-headers">
          {mappedSubheaders}
        </div> */}
      </div>
    </div>
  );
}

export default MobileDialDimepieceCard;
