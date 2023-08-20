import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const cartItemsSlice = createSlice({
  name: "restaurantMenuList",
  initialState,
  reducers: {
    cartItemsData: (state, action) => {
      return action.payload;
    },
    updateCartItemCount: (state, action) => {
      let targetIndex = state.findIndex(
        (item) => item.id === action.payload.id
      );
      state[targetIndex].item_count = action.payload.count;
    },
    removeCart: (state, action) => {
      return state.filter((item) => item.id !== action.payload.id);
    },
  },
});

export const { cartItemsData, updateCartItemCount, removeCart } =
  cartItemsSlice.actions;
export default cartItemsSlice.reducer;
