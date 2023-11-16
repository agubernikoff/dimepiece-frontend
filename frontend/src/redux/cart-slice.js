import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    displayCart: false,
    checkoutId: null,
    checkoutUrl: null,
    checkoutTotal: null,
    watches: [],
    cart: [],
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
    addToCart(state, action) {
      state.cart = [...state.cart, action.payload];
    },
    removeFromCart(state, action) {
      const filtered = [...state.cart].filter((w) => w._id !== action.payload);
      state.cart = filtered;
    },

    setSearchResults(state, action) {
      const searchText = action.payload;
      const filtered = state.posts.filter((p) =>
        p.title.toUpperCase().includes(searchText.toUpperCase())
      );
      if (!searchText) state.searchResults = [];
      else state.searchResults = filtered;
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
