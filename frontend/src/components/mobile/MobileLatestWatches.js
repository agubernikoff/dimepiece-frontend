import React, { useState, useEffect } from "react";
import { client } from "../../sanity/SanityClient";
import MobileLatestWatchesCard from "./MobileLatestWatchesCard";

function MobileLatestWatches() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    client
      .fetch(
        `*[_type == "product" && store.variants[0]._ref in *[_type == "productVariant" && store.inventory.isAvailable]._id][0..1]`
      )
      .then((response) => setProducts(response));
  }, []);
  const mapped = products.map((product) => (
    <MobileLatestWatchesCard key={product._id} watch={product} />
  ));
  return (
    <div>
      <p
        style={{ fontFamily: "swall-diatype-bold" }}
        className="section-title-home"
      >
        LATEST WATCHES
      </p>
      <div className="mobile-watches">{mapped}</div>
    </div>
  );
}

export default MobileLatestWatches;
