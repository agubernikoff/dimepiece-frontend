import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import WatchPreviewCard from "../../components/products/WatchPreviewCard";
import { cartActions } from "../../redux/cart-slice";
import NoResults from "./NoResults";

function SearchResults() {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const searchTermFromParams = searchParams.get("search");
  const watches = useSelector((state) => state.cart.watches);
  const searchText = useSelector((state) => state.cart.searchText);
  const searchResults = useSelector((state) => state.cart.searchResults);
  const mappedWatches = searchResults.map((w) => (
    <WatchPreviewCard key={w._id} watch={w} />
  ));

  useEffect(() => {
    if (searchTermFromParams)
      dispatch(cartActions.setSearchResults(searchTermFromParams));
  }, [watches]);

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
