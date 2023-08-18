import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import Routing from "./Routes/Routing";
import PageNotFound from "./Pages/PageNotFound/PageNotFound";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/shops/*" element={<Navbar />} />
        <Route path="/*" element={<PageNotFound />} />
      </Routes>
      <Routing />
    </BrowserRouter>
  );
}

export default App;
