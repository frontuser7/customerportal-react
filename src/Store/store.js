import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import { combineReducers } from "@reduxjs/toolkit";
import restoTableIdSlice from "./restoTableIdSlice";
import restoDetailsSlice from "./restoDetailsSlice";
import restoLanguageSlice from "./restoLanguageSlice";
import restoSessionSlice from "./restoSessionSlice";
import restoMenuListSlice from "./restoMenuListSlice";
import addToCartSlice from "./addToCartSlice";
import cartItemsSlice from "./cartItemsSlice";
import cartInfoSlice from "./cartInfoSlice";

const persistConfig = {
  key: "root",
  storage,
};

const reducer = combineReducers({
  restoTableIds: restoTableIdSlice,
  restoData: restoDetailsSlice,
  restoLanguage: restoLanguageSlice,
  restoSession: restoSessionSlice,
  menuData: restoMenuListSlice,
  cartData: addToCartSlice,
  cartItemData: cartItemsSlice,
  cartInfo: cartInfoSlice,
});

const persistedReducer = persistReducer(persistConfig, reducer);

const store = configureStore({
  reducer: persistedReducer,
});

export default store;
