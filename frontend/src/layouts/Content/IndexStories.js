import React from "react";
import { useNavigate } from "react-router-dom";
import IndexSubSection from "./IndexSubSection";

function IndexStories({ categories, stories, brynnsPick, isMobile }) {
  const nav = useNavigate();

  const mappedFeaturedTitles = [...stories]
    .filter((s) => s.isFeatured)
    .map((fs, i) => (
      <li
        key={i}
        onClick={() =>
          nav(`/stories/${fs.category.replaceAll(" ", "-")}/${fs._id}`)
        }
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
        <p className="stories-page-index-category-header">
          <strong>FEATURED</strong>
        </p>
        <ol>{mappedFeaturedTitles}</ol>
      </div>
      <div className="stories-page-index-list">
        <p className="stories-page-index-category-header">
          <strong>{"BRYNN'S PICK"}</strong>
        </p>
        {brynnsPick ? (
          <p
            className="stories-page-index-brynns-pick"
            onClick={() =>
              nav(
                `/shop/${brynnsPick.brand.replaceAll(" ", "-")}/${
                  brynnsPick._id
                }`
              )
            }
          >
            {brynnsPick.featuredHeadline}
          </p>
        ) : null}
      </div>
    </>
  );
}

export default IndexStories;
