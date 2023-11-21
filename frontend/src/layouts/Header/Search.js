import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { cartActions } from "../../redux/cart-slice";

function Search({ hideSearch }) {
  const ref = useRef();
  const nav = useNavigate();
  const dispatch = useDispatch();
  const [searchText, setSearchText] = useState("");
  const searchResults = useSelector((state) => state.cart.searchResults);
  useEffect(() => ref.current.focus());

  useEffect(() => {
    ref.current.focus();

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
      {/* <p>{String.fromCharCode(8594)}</p> */}
    </div>
  ));

  function handleSubmit() {
    if (searchText) {
      nav(`/search?search=${searchText}`);
      hideSearch();
    }
  }
  return (
    <div className="search">
      <div className="search-container">
        <form className="search-input-container" onSubmit={handleSubmit}>
          <input
            ref={ref}
            onChange={(e) => {
              dispatch(cartActions.setSearchResults(e.target.value));
              setSearchText(e.target.value);
            }}
            value={searchText.toUpperCase()}
          ></input>
          <button>{String.fromCharCode(8594)}</button>
        </form>
        {searchResults.length > 0 ? (
          <div className="suggestions-container">
            <p className="suggestion-title">SUGGESTIONS</p>
            <div>{mappedSuggestions}</div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default Search;
