import React from "react";
import { useSelector } from "react-redux";
import WatchPreviewCard from "../../components/products/WatchPreviewCard";
import NoResults from "./NoResults";

function SearchResults() {
  const searchText = useSelector((state) => state.cart.searchText);
  const searchResults = useSelector((state) => state.cart.searchResults);
  const mappedWatches = searchResults.map((w) => (
    <WatchPreviewCard key={w._id} watch={w} />
  ));
  return (
    <div style={{ width: "82%" }}>
      <div className="stories-page-content">
        {searchText && mappedWatches.length > 0 ? (
          <>
            <h3 className="section-title-home">{`"${searchText.toUpperCase()}"`}</h3>
            <div className="watches-page-card-container">{mappedWatches}</div>
          </>
        ) : (
          <NoResults />
        )}
      </div>
    </div>
  );
}

export default SearchResults;
