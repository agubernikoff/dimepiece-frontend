import { getAnalytics, logEvent } from "firebase/analytics";
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

  const analytics = getAnalytics();
  useEffect(() => {
    logEvent(analytics, "page_view", {
      page_location: window.location.href,
      page_title: "Search Results",
    });
  }, [window.location.href]);

  return (
    <div style={{ width: "82%" }}>
      <div className="stories-page-content">
        {searchText && mappedWatches.length > 0 ? (
          <>
            <p className="section-title-home">{`"${searchText.toUpperCase()}"`}</p>
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
