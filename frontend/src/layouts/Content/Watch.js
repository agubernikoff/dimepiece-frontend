import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { client } from "../../sanity/SanityClient";

function Watch() {
  const [watch, setWatches] = useState({});
  const URLParam = useParams();

  useEffect(() => {
    client
      .fetch(
        `*[_type == "product" && _id == "${URLParam.id}" && store.variants[0]._ref in *[_type == "productVariant" && store.inventory.isAvailable]._id][0]`
      )
      .then((response) => console.log(response));
  }, [URLParam.title]);
  return <div>Watch</div>;
}

export default Watch;
