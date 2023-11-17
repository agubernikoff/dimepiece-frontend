import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./cart-slice";
import articleSlice from "./article-slice";

const store = configureStore({
  reducer: {
    cart: cartSlice.reducer,
    article: articleSlice.reducer,
  },
});

export default store;
