import React, { useState, useEffect } from "react";
import { client } from "../../sanity/SanityClient";
import { PortableText } from "@portabletext/react";
import { useNavigate } from "react-router-dom";
import { cartActions } from "../../redux/cart-slice";
import { useDispatch } from "react-redux";

function MobileBrynnsPick() {
  const nav = useNavigate();
  const dispatch = useDispatch();

  const [featured, setFeatured] = useState([]);
  useEffect(() => {
    client
      .fetch(
        `*[_type == "product" && isFeatured == true][0]{...,brynnPickImage{asset->{url}}}`
      )
      .then((response) => setFeatured(response));
  }, []);
  if (featured.store) {
    return (
      <div className="mobile-featured-watch">
        <p
          style={{ fontFamily: "swall-diatype-bold" }}
          className="section-title-home"
        >
          {"SHOP BRYNN'S PICK"}
        </p>
        <p className="mobile-featured-watch-headline">
          {featured.featuredHeadline}
        </p>
        <div className="mobile-featured-watch-image">
          <img
            onClick={() => {
              nav(
                `/shop/${featured.brand.replaceAll(" ", "-")}/${featured._id}`
              );
              dispatch(cartActions.hideSearch());
            }}
            loading="lazy"
            src={featured.brynnPickImage.asset.url}
          />
        </div>
        <div className="mobile-featured-watch-details">
          <div className="mobile-featured-watch-detail-container">
            <p>
              <strong> DATE OF BIRTH</strong>
            </p>
            <p>{featured.dateOfBirth}</p>
          </div>
          <div className="mobile-featured-watch-detail-container">
            <p>
              <strong>MOVEMENT</strong>
            </p>
            <p>{featured.movement}</p>
          </div>

          <div className="mobile-featured-watch-detail-container">
            <p>
              <strong>MATERIAL</strong>
            </p>
            <p>{featured.material}</p>
          </div>
          <div className="mobile-featured-watch-detail-container">
            <p>
              <strong>SIZE</strong>
            </p>
            <p>{featured.size}</p>
          </div>
          <div className="mobile-featured-watch-detail-container">
            <p>
              <strong>CONDITION</strong>
            </p>
            <p>{featured.condition}</p>
          </div>
          <div className="mobile-featured-watch-detail-container">
            <p>
              <strong>BOX/PAPERS</strong>
            </p>
            <p>
              {featured.box ? "Yes" : "No"}/{featured.papers ? "Yes" : "No"}
            </p>
          </div>
        </div>
        <div className="mobile-featured-watch-description">
          <PortableText value={featured.description} />
        </div>
      </div>
    );
  }
}

export default MobileBrynnsPick;
