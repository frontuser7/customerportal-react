import { Routes, Route } from "react-router-dom";
import Landing from "../Pages/LandingPage/Landing";
import Menu from "../Pages/Menu/Menu";
import ViewCart from "../Pages/ViewCart/ViewCart";
import OrderSummery from "../Pages/OrderSummery/OrderSummery";
import Bill from "../Pages/Bill/Bill";

function App() {
  return (
    <Routes>
      <Route
        path="shops/landing/:restaurantId/:tableId"
        element={<Landing />}
      />
      <Route path="shops/menu/:restaurantId/:tableId" element={<Menu />} />
      <Route path="shops/cart/:restaurantId/:tableId" element={<ViewCart />} />
      <Route
        path="shops/ordersummery/:restaurantId/:tableId"
        element={<OrderSummery />}
      />
      <Route path="shops/bill/:session_uuid" element={<Bill />} />
    </Routes>
  );
}

export default App;
