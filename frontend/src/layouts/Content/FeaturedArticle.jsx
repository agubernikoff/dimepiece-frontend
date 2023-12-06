import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { articleActions } from "../../redux/article-slice";
import { cartActions } from "../../redux/cart-slice";

function FeaturedArticle() {
  const featured = useSelector((state) => state.article.featured);
  const nav = useNavigate();
  const dispatch = useDispatch();
  return (
    <div
      className="featured-story"
      onClick={() => {
        nav(
          `/stories/${featured.category.replaceAll(" ", "-")}/${featured._id}`
        );
        dispatch(articleActions.setIsArticleLoaded(false));
        dispatch(cartActions.hideSearch());
      }}
    >
      {featured ? (
        <>
          <img
            className="featured-story-img"
            alt={featured.title}
            src={featured.coverImage.asset.url}
            style={
              featured && featured.coverImage.hotspot
                ? {
                    backgroundImage: `url(${featured.coverImage.asset.url}?blur=50)`,
                    backgroundPosition: `${
                      featured.coverImage.hotspot.x * 100
                    }% ${featured.coverImage.hotspot.y * 100}%`,
                    backgroundSize: "cover",
                    objectPosition: `${featured.coverImage.hotspot.x * 100}% ${
                      featured.coverImage.hotspot.y * 100
                    }%`,
                  }
                : {
                    backgroundImage: `url(${featured.coverImage.asset.url}?blur=50)`,
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                  }
            }
          />
          <div className="featured-story-blurb-container">
            <div className="featured-story-blurb-container-inside">
              <h2 className="featured-story-preview-title">{featured.title}</h2>
              <p className="featured-story-preview-description">
                {featured.previewDescription}
              </p>
              <button className="read-story-btn">READ STORY</button>
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
}

export default FeaturedArticle;
