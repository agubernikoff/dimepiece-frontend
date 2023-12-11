import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { cartActions } from "../../redux/cart-slice";
import IndexSubSection from "./IndexSubSection";

function IndexStories({ categories, stories, brynnsPick, isMobile }) {
  const nav = useNavigate();
  const dispatch = useDispatch();

  const mappedFeaturedTitles = [...stories]
    .filter((s) => s.isFeatured)
    .map((fs, i) => (
      <li
        key={i}
        onClick={() => {
          nav(`/stories/${fs.category.replaceAll(" ", "-")}/${fs._id}`);
          dispatch(cartActions.hideSearch());
        }}
      >
        {fs.title}
      </li>
    ));

  return (
    <>
      <IndexSubSection
        title={"categories"}
        options={categories}
        includeAll={true}
        urlPrefix={"stories"}
        isMobile={isMobile}
      />
      <div className="stories-page-index-list">
        <p
          className="stories-page-index-category-header"
          style={isMobile ? null : { fontFamily: "swall-diatype-bold" }}
        >
          FEATURED
        </p>
        <ol>{isMobile ? null : mappedFeaturedTitles}</ol>
      </div>
      <div className="stories-page-index-list">
        <p
          className="stories-page-index-category-header"
          style={isMobile ? null : { fontFamily: "swall-diatype-bold" }}
        >
          {"BRYNN'S PICK"}
        </p>
        {brynnsPick && !isMobile ? (
          <p
            className="stories-page-index-brynns-pick"
            onClick={() => {
              nav(
                `/shop/${brynnsPick.brand.replaceAll(" ", "-")}/${
                  brynnsPick._id
                }`
              );
              dispatch(cartActions.hideSearch());
            }}
          >
            {brynnsPick.featuredHeadline}
          </p>
        ) : null}
      </div>
    </>
  );
}

export default IndexStories;
