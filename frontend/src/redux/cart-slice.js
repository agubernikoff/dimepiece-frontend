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
    clickedPost: null,
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
    setClickedPost(state, action) {
      state.clickedPost = action.payload;
    },
    editPost(state, action) {
      const updatedPost = action.payload;
      const filtered = state.posts.filter((p) => p.id !== updatedPost.id);
      const updatedPosts = [...filtered, updatedPost];
      const sorted = updatedPosts.sort((a, b) => a.id - b.id);
      state.posts = sorted;
    },
  },
});

export const cartActions = cartSlice.actions;

export default cartSlice;
