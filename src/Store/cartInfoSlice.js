import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const cartInfoSlice = createSlice({
  name: "cartInfo",
  initialState,
  reducers: {
    cartInfo: (state, action) => {
      return action.payload;
    },
  },
});

export const { cartInfo } = cartInfoSlice.actions;
export default cartInfoSlice.reducer;
