import { createSlice } from "@reduxjs/toolkit";

const aboutSlice = createSlice({
  name: "about",
  initialState: {
    about: null,
    press: [],
  },
  reducers: {
    setAbout(state, action) {
      state.about = action.payload;
    },
    setPress(state, action) {
      state.press = action.payload;
    },
  },
});

export const aboutActions = aboutSlice.actions;

export default aboutSlice;
