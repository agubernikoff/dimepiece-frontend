import { PortableText } from "@portabletext/react";
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
  console.log(watch);
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
        <div className="brynns-basics-card-description">
          <PortableText value={watch.description} />
        </div>
        <button
          className="brynns-basics-card-button"
          onClick={() => {
            nav(`/shop/${watch.brand.replaceAll(" ", "-")}/${watch._id}`);
            dispatch(cartActions.hideSearch());
          }}
        >
          Shop Now
        </button>
      </div>
    </div>
  );
}

export default BrynnsBasicsCard;
