import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const restoLanguageSlice = createSlice({
  name: "restaurantLanguage",
  initialState,
  reducers: {
    restoLanguage: (state, action) => {
      return action.payload;
    },
  },
});

export const { restoLanguage } = restoLanguageSlice.actions;
export default restoLanguageSlice.reducer;
