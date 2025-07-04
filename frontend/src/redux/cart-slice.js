import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    displayCart: false,
    displaySearch: false,
    checkoutId: null,
    checkoutUrl: null,
    checkoutTotal: null,
    watches: [],
    brands: [],
    brandTitles: [],
    cart: [],
    searchText: null,
    searchResults: [],
    lines: [],
  },
  reducers: {
    toggleDisplayCart(state) {
      state.displayCart = !state.displayCart;
    },
    showCart(state) {
      state.displayCart = true;
    },
    hideCart(state) {
      state.displayCart = false;
    },
    toggleDisplaySearch(state) {
      state.displaySearch = !state.displaySearch;
    },
    hideSearch(state) {
      state.displaySearch = false;
    },
    setCheckoutId(state, action) {
      state.checkoutId = action.payload;
    },
    setCheckoutUrl(state, action) {
      state.checkoutUrl = action.payload;
    },
    setCheckoutTotal(state, action) {
      state.checkoutTotal = action.payload;
    },
    setWatches(state, action) {
      state.watches = action.payload;
    },
    setBrands(state, action) {
      state.brands = action.payload;
      state.brandTitles = action.payload.map((b) => b.title).sort();
    },
    addToCartFromLineItems(state, action) {
      const productsToAdd = [];
      action.payload.forEach((variant) => {
        const watch = state.watches.find(
          (w) => w.store.variants[0].store.id == variant
        );
        productsToAdd.push(watch);
      });
      state.cart = productsToAdd;
    },
    addToCart(state, action) {
      state.cart = [...state.cart, action.payload];
    },
    removeFromCart(state, action) {
      const filtered = [...state.cart].filter((w) => w._id !== action.payload);
      state.cart = filtered;
    },
    setSearchResults(state, action) {
      const searchText = action.payload;
      state.searchText = searchText;
      const filtered = state.watches.filter((w) => {
        if (w.title.toUpperCase().includes(searchText.toUpperCase()))
          return true;
        if (
          w.title
            .replaceAll("-", " ")
            .toUpperCase()
            .includes(searchText.toUpperCase())
        )
          return true;
        if (w.brand.toUpperCase().includes(searchText.toUpperCase()))
          return true;
        if (
          w.brand
            .replaceAll("-", " ")
            .toUpperCase()
            .includes(searchText.toUpperCase())
        )
          return true;
      });

      if (!searchText || searchText.length < 3) state.searchResults = [];
      else state.searchResults = filtered;
    },
    setSearchText(state, action) {
      state.searchText = action.payload;
    },
    setLines(state, action) {
      state.lines = action.payload;
    },
  },
});

export const cartActions = cartSlice.actions;

export default cartSlice;
