import React, { useState, useEffect } from "react";
import { client } from "../../sanity/SanityClient";

function MostDiscussed() {
  const [mostDiscussed, setMostDiscussed] = useState([]);
  useEffect(() => {
    client
      .fetch(`*[_type == "product" && mostDiscussed == true][0]`)
      .then((response) => setMostDiscussed(response));
  }, []);
  console.log(mostDiscussed);
  if (mostDiscussed) return <div>MostDiscussed</div>;
}

export default MostDiscussed;
