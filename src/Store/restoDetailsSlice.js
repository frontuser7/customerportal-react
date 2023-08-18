import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const restoDetailsSlice = createSlice({
  name: "restaurantDetails",
  initialState,
  reducers: {
    restoData: (state, action) => {
      return action.payload;
    },
  },
});

export const { restoData } = restoDetailsSlice.actions;
export default restoDetailsSlice.reducer;
