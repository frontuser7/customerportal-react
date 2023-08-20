import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const addRemoveItemsSlice = createSlice({
  name: "addToCart",
  initialState,
  reducers: {
    addCartItem: (state, action) => {
      state.push(action.payload);
    },
    removeCartItem: (state, action) => {
      const index = state.findIndex((item) => item.id === action.payload);
      if (index !== -1) {
        state.splice(index, 1);
      }
    },
  },
});

export const { addCartItem, removeCartItem } = addRemoveItemsSlice.actions;
export default addRemoveItemsSlice.reducer;
