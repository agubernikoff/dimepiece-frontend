import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import MobileLatestWatchesCard from "./MobileLatestWatchesCard";

function MobileLatestWatches() {
  const products = useSelector((state) => state.cart.watches);
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
