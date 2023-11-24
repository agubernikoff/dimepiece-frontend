import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { articleActions } from "../../redux/article-slice";
import { cartActions } from "../../redux/cart-slice";
import { client } from "../../sanity/SanityClient";

function FeaturedArticle() {
  const [featured, setFeatured] = useState();
  const nav = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    client
      .fetch(
        `*[_type == "articles" && isFeatured == true]{_id,title,datePublished,category,_createdAt,featuredDescription,coverImage{asset->{url}}} | order(datePublished desc)[0]`
      )
      .then((response) => setFeatured(response));
  }, []);

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
            loading="lazy"
            className="featured-story-img"
            alt="***TO BE FIXED***"
            src={featured.coverImage.asset.url}
          />
          <div className="featured-story-blurb-container">
            <div className="featured-story-blurb-container-inside">
              <h2 className="featured-story-preview-title">{featured.title}</h2>
              <p className="featured-story-preview-description">
                {featured.featuredDescription}
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
