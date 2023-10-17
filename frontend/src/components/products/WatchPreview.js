import React, { useState, useEffect } from "react";

import { client } from "../../sanity/SanityClient";
import WatchPreviewCard from "./WatchPreviewCard";

function WatchPreview() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    client
      .fetch(`*[_type == "product"][0..9]`)
      .then((response) => setProducts(response));
  }, []);
  const mapped = products.map((product) => (
    <WatchPreviewCard key={product._id} watch={product.store} />
  ));
  return <div className="watch-preview-container">{mapped}</div>;
}

export default WatchPreview;
