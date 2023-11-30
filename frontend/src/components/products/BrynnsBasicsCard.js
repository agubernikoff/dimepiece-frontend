import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { cartActions } from "../../redux/cart-slice";

function BrynnsBasicsCard({ watch }) {
  const nav = useNavigate();
  const dispatch = useDispatch();
  const options = {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  };
  return (
    <div className="brynns-basics-card">
      <div className="brynns-basics-card-left">
        <img
          onClick={() => {
            nav(`/shop/${watch.brand.replaceAll(" ", "-")}/${watch._id}`);
            dispatch(cartActions.hideSearch());
          }}
          loading="lazy"
          src={watch.store.previewImageUrl}
          alt={watch.store.title}
        />
      </div>
      <div className="brynns-basics-card-right">
        <div className="brynns-basics-card-right-details">
          <p>{watch.brand.toUpperCase()}</p>
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
        <button
          className="brynns-basics-card-button"
          onClick={() => {
            nav(`/shop/${watch.brand.replaceAll(" ", "-")}/${watch._id}`);
            dispatch(cartActions.hideSearch());
          }}
        >
          View Product
        </button>
      </div>
    </div>
  );
}

export default BrynnsBasicsCard;
