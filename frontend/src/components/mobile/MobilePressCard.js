import React from "react";

function MobilePressCard({ article }) {
  return (
    <div className="mobile-about-dimepiece-press">
      <img alt={article.title} src={article.image.asset.url} />
      <div>
        <p className="blue">{article.brand}</p>
        <p className="mobile-about-dimepiece-press-title">{article.title}</p>
        <p className="mobile-about-dimepiece-description">
          {article.description}
        </p>
      </div>
    </div>
  );
}

export default MobilePressCard;
