import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import NoResults from "../../layouts/Content/NoResults";
import { cartActions } from "../../redux/cart-slice";
import MobileLatestWatchesCard from "./MobileLatestWatchesCard";

function MobileSearchResults() {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const searchTermFromParams = searchParams.get("search");
  const watches = useSelector((state) => state.cart.watches);
  const searchText = useSelector((state) => state.cart.searchText);
  const searchResults = useSelector((state) => state.cart.searchResults);
  const mappedWatches = searchResults.map((w) => (
    <MobileLatestWatchesCard key={w._id} watch={w} />
  ));

  useEffect(() => {
    if (searchTermFromParams)
      dispatch(cartActions.setSearchResults(searchTermFromParams));
  }, [watches]);
  return (
    <div className="mobile-stories">
      <div className="mobile-stories-page-content">
        {searchText && mappedWatches.length > 0 ? (
          <>
            <p className="section-title-home">{`"${searchText.toUpperCase()}"`}</p>
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
