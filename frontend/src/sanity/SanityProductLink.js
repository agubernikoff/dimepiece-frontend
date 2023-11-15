import React, { useEffect, useState } from "react";
import { client } from "./SanityClient";

function SanityProductLink({ value, children }) {
  const [product, setProduct] = useState();
  useEffect(() => {
    client
      .fetch(
        `*[_type == "product" && _id == "${value.productWithVariant.product._ref}" && store.variants[0]._ref in *[_type == "productVariant" && store.inventory.isAvailable]._id][0]{brand,_id}`
      )
      .then((response) => setProduct(response));
  }, []);
  return (
    <a
      href={`/shop/${product ? product.brand : "brand"}/${
        value.productWithVariant.product._ref
      }`}
    >
      {children}
    </a>
  );
}

export default SanityProductLink;
