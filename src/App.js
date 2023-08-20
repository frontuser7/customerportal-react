import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import Routing from "./Routes/Routing";
import PageNotFound from "./Pages/PageNotFound/PageNotFound";
import "react-toastify/dist/ReactToastify.css";
import { Provider } from "react-redux";
import store from "./Store/store";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import { ToastContainer } from "react-toastify";

let persist = persistStore(store);

function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persist}>
        <ToastContainer />
        <BrowserRouter>
          <Routes>
            <Route path="/shops/*" element={<Navbar />} />
            <Route path="/*" element={<PageNotFound />} />
          </Routes>
          <Routing />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
}

export default App;
