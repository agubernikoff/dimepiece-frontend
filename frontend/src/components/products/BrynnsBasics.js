import React, { useState, useEffect } from "react";
import { client } from "../../sanity/SanityClient";
import BrynnsBasicsCard from "./BrynnsBasicsCard";

function BrynnsBasics() {
  const [brynnsBasics, setBrynnsBasics] = useState([]);
  useEffect(() => {
    client
      .fetch(
        `*[_type == "product" && brynnsBasics == true && store.variants[0]._ref in *[_type == "productVariant" && store.inventory.isAvailable]._id][0..9]`
      )
      .then((response) => setBrynnsBasics(response));
  }, []);
  const mapped = brynnsBasics.map((bb) => (
    <BrynnsBasicsCard key={bb._id} watch={bb} />
  ));
  return (
    <div className="brynns-basics">
      <h3 className="section-title-home">{"BRYNN'S BASICS"}</h3>
      <div className="brynns-basics-cards-container">{mapped}</div>
    </div>
  );
}

export default BrynnsBasics;
