import { createSlice } from "@reduxjs/toolkit";

const mobileFilterSlice = createSlice({
  name: "mobileFilter",
  initialState: {
    isDialogueOpen: false,
    primaryFilter: "All",
    urlPrefix: null,
  },
  reducers: {
    setIsDialogueOpen(state, action) {
      state.isDialogueOpen = action.payload;
    },
    setPrimaryFilter(state, action) {
      state.primaryFilter = action.payload;
    },
    setUrlPrefix(state, action) {
      state.urlPrefix = action.payload;
    },
  },
});

export const mobileFilterActions = mobileFilterSlice.actions;

export default mobileFilterSlice;
