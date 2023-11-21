import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { cartActions } from "../../redux/cart-slice";

function MobileSearch({ hideSearch }) {
  const nav = useNavigate();
  const dispatch = useDispatch();
  const [searchText, setSearchText] = useState("");
  const searchResults = useSelector((state) => state.cart.searchResults);

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
      nav("/search");
      hideSearch();
    }
  }
  return (
    <div className="mobile-search">
      <div className="search-container">
        <form className="search-input-container" onSubmit={handleSubmit}>
          <input
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

export default MobileSearch;
