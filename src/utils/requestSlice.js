import { createSlice } from "@reduxjs/toolkit";

const requestSlice = createSlice({
  name: "raquests",
  initialState: null,
  reducers: {
    addRequests: (state, action) => action.payload,
    removeRequest: (state, action) => {
      console.log(action, state);
      const newArray = state.filter((r) => r._id !== action.payload);
      return newArray;
    }
  }
});

export const { addRequests, removeRequest } = requestSlice.actions;
export default requestSlice.reducer;
