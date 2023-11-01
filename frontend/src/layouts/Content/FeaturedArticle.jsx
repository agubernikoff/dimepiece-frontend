import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { client } from "../../sanity/SanityClient";

function FeaturedArticle() {
  const [featured, setFeatured] = useState();
  const nav = useNavigate();

  useEffect(() => {
    client
      .fetch(
        `*[_type == "articles" && isFeatured == true]{_id,title,datePublished,category,_createdAt,coverImage{asset->{url}}} | order(datePublished desc)[0]`
      )
      .then((response) => setFeatured(response));
  }, []);

  if (featured)
    return (
      <div className="featured-story">
        <img
          className="featured-story-img"
          alt="***TO BE FIXED***"
          src={featured.coverImage.asset.url}
        />
        <div className="featured-story-blurb-container">
          <div className="featured-story-blurb-container-inside">
            <h2 className="featured-story-preview-title">{featured.title}</h2>
            <p className="featured-story-preview-description">
              The CEO of Audemars Piguet and I were scheduled to meet on a
              sunny, sultry day in late August, but it was cool and crisp inside
              AP House, the new(ish) appointment only concept space by Audemars
              Piguet.
            </p>
            <button className="read-story-btn" onClick={() =>
          nav(`/stories/${featured.category.replaceAll(" ", "-")}/${featured._id}`)
        }>READ STORY</button>
          </div>
        </div>
      </div>
    );
}

export default FeaturedArticle;
