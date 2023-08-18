import { Routes, Route } from "react-router-dom";
import Landing from "../Pages/LandingPage/Landing";
import Menu from "../Pages/Menu/Menu";
import ViewCart from "../Pages/ViewCart/ViewCart";
import { Provider } from "react-redux";
import store from "../Store/store";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import { ToastContainer } from "react-toastify";

let persist = persistStore(store);

function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persist}>
        <ToastContainer />
        <Routes>
          <Route
            path="shops/landing/:restaurantId/:tableId"
            element={<Landing />}
          />
          <Route path="shops/menu/:restaurantId/:tableId" element={<Menu />} />
          <Route
            path="shops/cart/:restaurantId/:tableId"
            element={<ViewCart />}
          />
        </Routes>
      </PersistGate>
    </Provider>
  );
}

export default App;
