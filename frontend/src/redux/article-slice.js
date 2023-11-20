import { createSlice } from "@reduxjs/toolkit";

const articleSlice = createSlice({
  name: "article",
  initialState: {
    isArticleLoaded: false,
    brynnsPick: null,
    stories: [],
    types: [],
    categories: [],
  },
  reducers: {
    setIsArticleLoaded(state, action) {
      state.isArticleLoaded = action.payload;
    },
    setBrynnsPick(state, action) {
      state.brynnsPick = action.payload;
    },
    setStories(state, action) {
      state.stories = action.payload;
    },
    setTypes(state, action) {
      state.types = action.payload;
      state.categories = action.payload.map((t) => t.title);
    },
  },
});

export const articleActions = articleSlice.actions;

export default articleSlice;
