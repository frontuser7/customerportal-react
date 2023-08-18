import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const restoMenuListSlice = createSlice({
  name: "restaurantMenuList",
  initialState,
  reducers: {
    menuData: (state, action) => {
      return action.payload;
    },
    updateCount: (state, action) => {
      let targetIndex = state.findIndex(
        (item) => item.id === action.payload.id
      );
      state[targetIndex].count = action.payload.count;
    },
  },
});

export const { menuData, updateCount } = restoMenuListSlice.actions;
export default restoMenuListSlice.reducer;
