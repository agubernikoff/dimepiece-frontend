import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { client } from "../../sanity/SanityClient";
import { PortableText } from "@portabletext/react";
import { motion, AnimatePresence } from "framer-motion";

function Watch() {
  const [watch, setWatch] = useState();
  const URLParam = useParams();

  const options = {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  };

  useEffect(() => {
    client
      .fetch(
        `*[_type == "product" && _id == "${URLParam.id}" && store.variants[0]._ref in *[_type == "productVariant" && store.inventory.isAvailable]._id][0]{...,productImages[]{_key,asset->{url}}}`
      )
      .then((response) => setWatch(response));
  }, [URLParam.title]);

  const mappedImages =
    watch && watch.productImages
      ? watch.productImages.map((i) => (
          <img
            loading="lazy"
            key={i._key}
            src={i.asset.url}
            alt={watch.title}
          />
        ))
      : null;

  if (watch)
    return (
      <AnimatePresence mode="popLayout">
        <motion.div
          className="stories-page-content"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: "backInOut" }}
          key="watch"
        >
          <div className="product-container">
            <div className="product-images-container">{mappedImages}</div>
            <div className="product-description-container">
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
              <div className="watch-description-table">
                <div className="watch-description-table-row">
                  <p className="watch-description-table-row-key">
                    DATE OF BIRTH
                  </p>
                  <p className="watch-description-table-row-value">
                    {watch.dateOfBirth}
                  </p>
                </div>
                <div className="watch-description-table-row">
                  <p className="watch-description-table-row-key">MATERIAL</p>
                  <p className="watch-description-table-row-value">
                    {watch.material}
                  </p>
                </div>
                <div className="watch-description-table-row">
                  <p className="watch-description-table-row-key">SIZE</p>
                  <p className="watch-description-table-row-value">
                    {watch.size}
                  </p>
                </div>
                <div className="watch-description-table-row">
                  <p className="watch-description-table-row-key">MOVEMENT</p>
                  <p className="watch-description-table-row-value">
                    {watch.movement}
                  </p>
                </div>
                <div className="watch-description-table-row">
                  <p className="watch-description-table-row-key">CONDITION</p>
                  <p className="watch-description-table-row-value">
                    {watch.condition}
                  </p>
                </div>
                <div className="watch-description-table-row">
                  <p className="watch-description-table-row-key">BOX</p>
                  <p className="watch-description-table-row-value">
                    {watch.box ? "Yes" : "No"}
                  </p>
                </div>
                <div className="watch-description-table-row">
                  <p className="watch-description-table-row-key">PAPERS</p>
                  <p className="watch-description-table-row-value">
                    {watch.papers ? "Yes" : "No"}
                  </p>
                </div>
              </div>
              <div className="watch-description-buttons-container">
                <button>ADD TO CART</button>
                <button>BUY NOW</button>
              </div>
              <div>
                <p>{"BRYNN'S DESCRIPTION:"}</p>
                <PortableText value={watch.description} />
                <p>THE NITTY GRITTY:</p>
                <PortableText value={watch.nittyGritty} />
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    );
}

export default Watch;
