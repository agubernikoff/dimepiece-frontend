import React from "react";

function PressCard({ article }) {
  return (
    <div className="about-dimepiece-press">
      <img alt={article.title} src={article.image.asset.url} />
      <div>
        <p className="blue">{article.brand}</p>
        <p className="about-dimepiece-press-title">{article.title}</p>
        <p className="dimepiece-press-text">{article.description}</p>
      </div>
    </div>
  );
}

export default PressCard;
