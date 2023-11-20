import React from "react";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import WatchPreviewCard from "../../components/products/WatchPreviewCard";
import NoResults from "../../layouts/Content/NoResults";
import MobileLatestWatchesCard from "./MobileLatestWatchesCard";

function MobileSearchResults() {
  const searchText = useSelector((state) => state.cart.searchText);
  const searchResults = useSelector((state) => state.cart.searchResults);
  const mappedWatches = searchResults.map((w) => (
    <MobileLatestWatchesCard key={w._id} watch={w} />
  ));
  return (
    <div className="mobile-stories">
      <div className="mobile-stories-page-content">
        {searchText ? (
          <>
            <h3 className="section-title-home">{`"${searchText.toUpperCase()}"`}</h3>
            <div className="mobile-content-mapped">{mappedWatches}</div>
          </>
        ) : (
          <NoResults />
        )}
      </div>
    </div>
  );
}

export default MobileSearchResults;
