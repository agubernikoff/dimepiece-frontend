import { getAnalytics, logEvent } from "firebase/analytics";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import NoResults from "../../layouts/Content/NoResults";
import { articleActions } from "../../redux/article-slice";
import { cartActions } from "../../redux/cart-slice";
import MobileLatestStoriesCard from "./MobileLatestStoriesCard";
import MobileLatestWatchesCard from "./MobileLatestWatchesCard";

function MobileSearchResults() {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const searchTermFromParams = searchParams.get("search");
  const watches = useSelector((state) => state.cart.watches);
  const watchesSearchText = useSelector((state) => state.cart.searchText);
  const watchesSearchResults = useSelector((state) => state.cart.searchResults);
  const mappedWatches = watchesSearchResults
    .slice(0, 10)
    .map((w) => <MobileLatestWatchesCard key={w._id} watch={w} />);
  const articles = useSelector((state) => state.article.stories);
  const articlesSearchText = useSelector((state) => state.article.searchText);
  const articlesSearchResults = useSelector(
    (state) => state.article.searchResults
  );
  const mappedArticles = articlesSearchResults
    .slice(0, 8)
    .map((a) => <MobileLatestStoriesCard key={a._id} story={a} />);

  useEffect(() => {
    if (searchTermFromParams) {
      dispatch(cartActions.setSearchResults(searchTermFromParams));
      dispatch(articleActions.setSearchResults(searchTermFromParams));
    }
  }, [watches, articles]);

  const analytics = getAnalytics();
  useEffect(() => {
    logEvent(analytics, "page_view", {
      page_location: window.location.href,
      page_title: "Search Results",
    });
  }, [window.location.href]);

  return (
    <div className="mobile-stories">
      <div className="mobile-stories-page-content">
        {(watchesSearchText && mappedWatches.length > 0) ||
        (articlesSearchText && mappedArticles.length > 0) ? (
          <>
            <p className="section-title-home">{`"${watchesSearchText.toUpperCase()}"`}</p>
            {mappedWatches.length > 0 ? (
              <p className="section-title-home">SUGGESTED WATCHES</p>
            ) : null}
            <div className="mobile-content-mapped">{mappedWatches}</div>
            {mappedArticles.length > 0 ? (
              <p className="section-title-home" style={{ marginBottom: "5%" }}>
                SUGGESTED STORIES
              </p>
            ) : null}
            <div className="mobile-content-mapped search-results">
              {mappedArticles}
            </div>
          </>
        ) : (
          <NoResults />
        )}
      </div>
    </div>
  );
}

export default MobileSearchResults;
