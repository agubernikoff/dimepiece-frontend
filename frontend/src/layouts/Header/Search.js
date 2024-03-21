import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { cartActions } from "../../redux/cart-slice";
import { articleActions } from "../../redux/article-slice";
import { AnimatePresence, motion, useAnimate } from "framer-motion";
import useMeasure from "react-use-measure";
import { getAnalytics, logEvent } from "firebase/analytics";

function Search({ hideSearch }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchTermFromParams = searchParams.get("search");
  const input = useRef();
  const nav = useNavigate();
  const dispatch = useDispatch();
  const analytics = getAnalytics();
  const [searchText, setSearchText] = useState("");
  const searchProductResults = useSelector((state) => state.cart.searchResults);
  const globalProductSearchText = useSelector((state) => state.cart.searchText);
  const searchArticleResults = useSelector(
    (state) => state.article.searchResults
  );
  const globalArticleSearchText = useSelector(
    (state) => state.article.searchText
  );

  useEffect(() => {
    input.current.focus();
    if (
      searchTermFromParams &&
      globalProductSearchText &&
      globalArticleSearchText
    ) {
      setSearchText(searchTermFromParams);
    }
  }, []);

  useEffect(() => {
    if (searchTermFromParams && !searchText) {
      searchParams.delete("search");
      setSearchParams(searchParams);
    }
  }, [searchText]);

  useEffect(() => {
    input.current.focus();

    const handleEscapeKey = (event) => {
      if (event.key === "Escape") {
        hideSearch();
      }
    };

    document.addEventListener("keydown", handleEscapeKey);

    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [hideSearch]);

  const mappedProductSuggestions = searchProductResults.slice(0, 3).map((w) => (
    <div
      key={w._id}
      className="suggestion-arrow-container"
      onClick={() => {
        logEvent(analytics, "search", {
          search_term: `${searchText}`,
        });
        nav(`/shop/${w.brand}/${w._id}`);
        hideSearch();
      }}
    >
      <p className="suggestion">
        {`${w.brand.toUpperCase()} ${w.title.toUpperCase()}`},{" "}
        {w.material.toUpperCase()}
      </p>
    </div>
  ));

  const mappedArticleSuggestions = searchArticleResults.slice(0, 3).map((a) => (
    <div
      key={a._id}
      className="suggestion-arrow-container"
      onClick={() => {
        nav(`/stories/${a.category.replaceAll(" ", "-")}/${a._id}`);
        hideSearch();
      }}
    >
      <p className="suggestion">{`${a.title.toUpperCase()}`}</p>
    </div>
  ));

  function handleSubmit(e) {
    e.preventDefault();
    if (searchText) {
      logEvent(analytics, "search", {
        search_term: `${searchText}`,
      });
      nav(`/search?search=${searchText}`);
      hideSearch();
    }
  }

  let [searchContainer, { height }] = useMeasure();
  const suggestionsContainer = useRef();
  const [scope, animate] = useAnimate();
  const originalHeight = useRef();

  useEffect(() => {
    if (!originalHeight.current && height > 0) originalHeight.current = height;
    if (searchProductResults) animate(scope.current, { height });
  }, [height]);

  function removeSuggestions() {
    if (suggestionsContainer.current.style.opacity == 1) {
      animate(scope.current, { height: originalHeight.current });
    } else animate(scope.current, { height });
  }

  return (
    <motion.div
      initial={{ y: "-100%" }}
      animate={{
        y: 0,
        height,
        transition: { ease: "easeOut", duration: 0.25 },
      }}
      exit={{ y: "-100%", transition: { ease: "easeIn", duration: 0.25 } }}
      transition={{
        ease: "easeOut",
        height: { duration: 0.25 },
      }}
      layout="size"
      key="search"
      className="search"
      ref={scope}
    >
      <motion.div className="search-container" ref={searchContainer}>
        <form className="search-input-container" onSubmit={handleSubmit}>
          <input
            ref={input}
            onChange={(e) => {
              dispatch(cartActions.setSearchResults(e.target.value));
              dispatch(articleActions.setSearchResults(e.target.value));
              setSearchText(e.target.value);
            }}
            value={searchText.toUpperCase()}
          ></input>
          <button>{String.fromCharCode(8594)}</button>
        </form>
        <AnimatePresence>
          {searchProductResults.length > 0 ||
          searchArticleResults.length > 0 ? (
            <motion.div
              initial={{ y: "-50%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "-50%", opacity: 0 }}
              transition={{ duration: 0.25, ease: "linear" }}
              onAnimationStart={removeSuggestions}
              key="suggestions-container"
              className="suggestions-container"
              ref={suggestionsContainer}
            >
              {searchProductResults.length > 0 ? (
                <>
                  <p className="suggestion-title">SUGGESTED PRODUCTS</p>
                  <div style={{ marginBottom: "1.5rem" }}>
                    {mappedProductSuggestions}
                  </div>{" "}
                </>
              ) : null}
              {searchArticleResults.length > 0 ? (
                <>
                  <p className="suggestion-title">SUGGESTED ARTICLES</p>
                  <div>{mappedArticleSuggestions}</div>
                </>
              ) : null}
            </motion.div>
          ) : null}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}

export default Search;
