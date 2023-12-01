import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./cart-slice";
import articleSlice from "./article-slice";
import mobileFilterSlice from "./mobile-filter-slice";
import aboutSlice from "./about-slice";

const store = configureStore({
  reducer: {
    cart: cartSlice.reducer,
    article: articleSlice.reducer,
    mobileFilter: mobileFilterSlice.reducer,
    about: aboutSlice.reducer,
  },
});

export default store;
