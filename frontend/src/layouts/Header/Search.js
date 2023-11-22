import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { cartActions } from "../../redux/cart-slice";
import { AnimatePresence, motion, useAnimate } from "framer-motion";
import useMeasure from "react-use-measure";

function Search({ hideSearch }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchTermFromParams = searchParams.get("search");
  const input = useRef();
  const nav = useNavigate();
  const dispatch = useDispatch();
  const [searchText, setSearchText] = useState("");
  const searchResults = useSelector((state) => state.cart.searchResults);
  const globalSearchText = useSelector((state) => state.cart.searchText);

  useEffect(() => {
    input.current.focus();
    if (searchTermFromParams && globalSearchText) {
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

  const mappedSuggestions = searchResults.map((w) => (
    <div
      key={w._id}
      className="suggestion-arrow-container"
      onClick={() => {
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

  function handleSubmit(e) {
    e.preventDefault();
    if (searchText) {
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
    if (searchResults) animate(scope.current, { height });
  }, [height]);

  function removeSuggestions() {
    if (suggestionsContainer.current.style.opacity == 1) {
      animate(scope.current, { height: originalHeight.current });
    } else animate(scope.current, { height });
  }

  return (
    <motion.div
      initial={{ y: "-100%" }}
      animate={{ y: 0, height }}
      exit={{ y: "-100%" }}
      transition={{
        duration: 0.25,
        ease: "linear",
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
              setSearchText(e.target.value);
            }}
            value={searchText.toUpperCase()}
          ></input>
          <button>{String.fromCharCode(8594)}</button>
        </form>
        <AnimatePresence>
          {searchResults.length > 0 ? (
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
              <p className="suggestion-title">SUGGESTIONS</p>
              <div>{mappedSuggestions}</div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}

export default Search;
