import React from "react";

function PressCard({ article }) {
  console.log(article);
  return (
    <div>
      <img alt={article.title} src={article.image.asset.url} />
      <div>
        <p className="blue">{article.brand}</p>
        <p>{article.description}</p>
      </div>
    </div>
  );
}

export default PressCard;
