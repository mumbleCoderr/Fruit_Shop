import "./stylesheets/App.css";
import Item from "./components/Item";
import ListItems from "./components/ListItems";
import ProductDetail from "./components/ProductDetail";
import NotFound from "./components/NotFound";
import SignUp from "./components/SignUp";
import LogIn from "./components/LogIn";
import Cart from "./components/Cart";
import Address from "./components/Address";
import Profile from "./components/Profile";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import TopBar from "./components/TopBar";
import OrderOk from "./components/OrderOk";
import { getUserRole } from "./js/Auth";
import AdminPanel from "./components/AdminPanel";

const App = () => {
  const userRole = getUserRole();

  return (
    <Router>
      <TopBar />
      <Routes>
        <Route
          path="/"
          element={userRole === "ROLE_ADMIN" ? <AdminPanel /> : <ListItems />}
        />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/LogIn" element={<LogIn />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/Cart" element={<Cart />} />
        <Route path="/Address" element={<Address />} />
        <Route path="/OrderOk" element={<OrderOk />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
