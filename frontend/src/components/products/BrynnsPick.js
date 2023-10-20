import React, { useState, useEffect } from "react";
import { client } from "../../sanity/SanityClient";

function BrynnsPick() {
  const options = {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  };

  const [featured, setFeatured] = useState([]);
  useEffect(() => {
    client
      .fetch(
        `*[_type == "product" && isFeatured == true][0]{...,brynnPickImage{asset->{url}}}`
      )
      .then((response) => setFeatured(response));
  }, []);

  console.log(featured);

  if (featured.store) {
    return (
      <div className="featured-watch">
        <h3 className="section-title-home">{"SHOP BRYNN'S PICK"}</h3>
        <p className="featured-watch-headline">{featured.featuredHeadline}</p>
        <div className="featured-watch-content-container">
          <div className="featured-watch-description">
            {/* <p>{featured.description}</p> */}
            <button>View Product</button>
          </div>
          <div className="featured-watch-image">
            <img src={featured.brynnPickImage.asset.url} />
          </div>
          <div className="featured-watch-details">
            <div className="featured-watch-detail-container">
              <p>{featured.brand}</p>
              <p>{featured.title}</p>
              <p>
                {featured.store.priceRange.minVariantPrice.toLocaleString(
                  "en-US",
                  options
                )}
              </p>
            </div>
            <div className="featured-watch-detail-container">
              <h5>DATE OF BIRTH</h5>
              <p>{featured.dateOfBirth}</p>
            </div>
            <div className="featured-watch-detail-container">
              <h5>MATERIAL</h5>
              <p>{featured.material}</p>
            </div>
            <div className="featured-watch-detail-container">
              <h5>SIZE</h5>
              <p>{featured.size}</p>
            </div>
            <div className="featured-watch-detail-container">
              <h5>MOVEMENT</h5>
              <p>{featured.movement}</p>
            </div>
            <div className="featured-watch-detail-container">
              <h5>CONDITION</h5>
              <p>{featured.condition}</p>
            </div>
            <div className="featured-watch-detail-container">
              <h5>BOX/PAPERS</h5>
              <p>{featured.boxPapers}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default BrynnsPick;
