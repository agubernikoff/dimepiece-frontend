import { createSlice } from "@reduxjs/toolkit";

const articleSlice = createSlice({
  name: "article",
  initialState: { isArticleLoaded: false },
  reducers: {
    setIsArticleLoaded(state, action) {
      state.isArticleLoaded = action.payload;
    },
  },
});

export const articleActions = articleSlice.actions;

export default articleSlice;
