import React from "react";

function WatchPreviewCard({ watch }) {
  const options = {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  };
  return (
    <div className="watch-preview-card">
      <img src={watch.store.previewImageUrl} alt={watch.title} />
      <div className="watch-preview-card-details">
        <p>{watch.brand.toUpperCase()}</p>
        <p>{watch.title}</p>
        <p>
          {watch.store.priceRange.maxVariantPrice.toLocaleString(
            "en-US",
            options
          )}
        </p>
      </div>
    </div>
  );
}

export default WatchPreviewCard;
