import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import { combineReducers } from "@reduxjs/toolkit";
import restoTableIdSlice from "./restoTableIdSlice";
import restoDetailsSlice from "./restoDetailsSlice";
import restoLanguageSlice from "./restoLanguageSlice";
import restoSessionSlice from "./restoSessionSlice";
import restoMenuListSlice from "./restoMenuListSlice";

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
});

const persistedReducer = persistReducer(persistConfig, reducer);

const store = configureStore({
  reducer: persistedReducer,
});

export default store;
