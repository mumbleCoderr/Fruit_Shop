import "./stylesheets/App.css";
import Item from "./components/Item";
import ListItems from "./components/ListItems";
import ProductDetail from "./components/ProductDetail";
import NotFound from "./components/NotFound";
import SignUp from "./components/SignUp";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import TopBar from "./components/TopBar";

const App = () => {
  return (
    <Router>
      <TopBar />
      <Routes>
        <Route path="/" element={<ListItems />} />

        <Route path="/product/:id" element={<ProductDetail />} />

        <Route path="/SignUp" element={<SignUp />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
