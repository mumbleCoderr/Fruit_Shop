import "./stylesheets/App.css";
import Item from "./components/Item";
import ListItems from "./components/ListItems";
import ProductDetail from "./components/ProductDetail";
import NotFound from "./components/NotFound";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <header>FRUIT SHOP</header>
      <Routes>
        <Route path="/" element={<ListItems />} />

        <Route path="/product/:id" element={<ProductDetail />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
