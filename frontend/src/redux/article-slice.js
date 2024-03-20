import { createSlice } from "@reduxjs/toolkit";

const articleSlice = createSlice({
  name: "article",
  initialState: {
    isArticleLoaded: false,
    brynnsPick: null,
    stories: [],
    types: [],
    categories: [],
    featured: null,
    searchResults: [],
    searchText: null,
  },
  reducers: {
    setFeatured(state, action) {
      state.featured = action.payload;
    },
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
    setSearchResults(state, action) {
      const searchText = action.payload;
      state.searchText = searchText;
      const filtered = state.stories.filter((w) =>
        w.title.toUpperCase().includes(searchText.toUpperCase())
      );

      if (!searchText || searchText.length < 3) state.searchResults = [];
      else state.searchResults = filtered;
    },
    setSearchText(state, action) {
      state.searchText = action.payload;
    },
  },
});

export const articleActions = articleSlice.actions;

export default articleSlice;
