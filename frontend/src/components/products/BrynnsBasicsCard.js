import React from "react";

function BrynnsBasicsCard({ watch }) {
  const options = {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  };
  return (
    <div className="brynns-basics-card">
      <div className="brynns-basics-card-left">
        <img src={watch.store.previewImageUrl} alt={watch.store.title} />
      </div>
      <div className="brynns-basics-card-right">
        <div className="brynns-basics-card-right-details">
          <p>{watch.brand}</p>
          <p>{watch.title}</p>
          <p>
            {watch.store.priceRange.minVariantPrice.toLocaleString(
              "en-US",
              options
            )}
          </p>
        </div>
        <p className="brynns-basics-card-description">
          This watch is called the Princess, and aptly so. Not a mighty king,
          not a sternly regal queen, but a charming princess. Pink and cute, but
          important, nonetheless. We love this watch for her color and size, but
          also because you rarely see this out and about.{" "}
        </p>
        <button className="brynns-basics-card-button">View Product</button>
      </div>
    </div>
  );
}

export default BrynnsBasicsCard;
