import React, { useState, useEffect } from "react";
import { client } from "../../sanity/SanityClient";
import WatchPreviewCard from "./WatchPreviewCard";

function WatchPreview() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    client
      .fetch(
        `*[_type == "product" && store.variants[0]._ref in *[_type == "productVariant" && store.inventory.isAvailable]._id][0..9]`
      )
      .then((response) => setProducts(response));
  }, []);
  const mapped = products.map((product) => (
    <WatchPreviewCard key={product._id} watch={product.store} />
  ));
  return (
    <div className="latest-watches">
      <h3 className="section-title-home">LATEST WATCHES</h3>
      <div className="watch-preview-container">{mapped}</div>
    </div>
  );
}

export default WatchPreview;
