import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
  name: "feed",
  initialState: null,
  reducers: {
    addFeed: (state, action) => action.payload,
    clearFeed: (state, action) => {
      // console.log("actionPayload: ", action.payload);
      const newFeed = state.filter((user) => user._id !== action.payload);
      return newFeed;
    }
  }
});

export const { addFeed, clearFeed } = feedSlice.actions;
export default feedSlice.reducer;
