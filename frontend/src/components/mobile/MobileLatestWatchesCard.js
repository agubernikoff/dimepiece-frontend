import { getAnalytics, logEvent } from "firebase/analytics";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { cartActions } from "../../redux/cart-slice";

function MobileLatestWatchesCard({ watch }) {
  const nav = useNavigate();
  const dispatch = useDispatch();
  const options = {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  };
  const analytics = getAnalytics();

  return (
    <div
      className="mobile-watch-preview-card"
      onClick={() => {
        logEvent(analytics, "select_content", {
          content_type: "Watch",
          content_id: watch.title,
        });
        nav(`/shop/${watch.brand.replaceAll(" ", "-")}/${watch._id}`);
        dispatch(cartActions.hideSearch());
      }}
    >
      <img loading="lazy" src={watch.store.previewImageUrl} alt={watch.title} />
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

export default MobileLatestWatchesCard;
