import React from "react";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import WatchPreviewCard from "../../components/products/WatchPreviewCard";

function MobileSearchResults() {
  const searchText = useSelector((state) => state.cart.searchText);
  const searchResults = useSelector((state) => state.cart.searchResults);
  const mappedWatches = searchResults.map((w) => (
    <WatchPreviewCard key={w._id} watch={w} />
  ));
  return (
    <div className="stories-page">
      <div className="stories-page-content">
        <h3 className="section-title-home">{`"${searchText.toUpperCase()}"`}</h3>
        <div className="watches-page-card-container">{mappedWatches}</div>
      </div>
    </div>
  );
}

export default MobileSearchResults;
