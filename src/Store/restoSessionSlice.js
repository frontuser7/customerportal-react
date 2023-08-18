import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const restoSessionSlice = createSlice({
  name: "restaurantSession",
  initialState,
  reducers: {
    restoSession: (state, action) => {
      return action.payload;
    },
  },
});

export const { restoSession } = restoSessionSlice.actions;
export default restoSessionSlice.reducer;
