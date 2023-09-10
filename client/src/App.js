import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Policy from "./pages/Policy";
import Pagenotfound from "./pages/Pagenotfound";
import Dashboard from "./pages/user/Dashboard";
import Orders from "./pages/user/Orders";
import Profile from "./pages/user/Profile";
import SellerDashboard from "./pages/Seller/SellerDashboard";
import CreateCategory from "./pages/Seller/CreateCategory";
import CreateProduct from "./pages/Seller/CreateProduct";
import Users from "./pages/Seller/Users";
import Products from "./pages/Seller/Products";
import UpdateProduct from "./pages/Seller/UpdateProduct";
import Search from "./pages/Search";
import ProductDetails from "./pages/ProductDetails";
import Categories from "./pages/Categories";
import CategoryProduct from "./pages/CategoryProduct";
import CartPage from "./pages/CartPage";
import Register from "./pages/Auth/Register";
import Login from "./pages/Auth/Login";
import PrivateRoute from "./components/Routes/Private";
import SellerRoute from "./components/Routes/SellerRoute";
import AdminRoute from "./components/Routes/AdminRoute"
import AdminDashboard from "./pages/Admin/AdminDashboard";
import ProductsAdmin from "./pages/Admin/ProductsAdmin";


function App() {
  return (
    <>
      <Routes>
      <Route path="/dashboard" element={<PrivateRoute />}>
        <Route path="user" element={<Dashboard />} />
        <Route path="user/orders" element={<Orders />} />
        <Route path="user/profile" element={<Profile />} />
      </Route>
      <Route path="/dashboard" element={<SellerRoute />}>
        <Route path="seller" element={<SellerDashboard />} />
        <Route path="seller/create-category" element={<CreateCategory />} />
        <Route path="seller/create-product" element={<CreateProduct />} />
        <Route path="seller/product/:slug" element={<UpdateProduct />} />
        <Route path="seller/products" element={<Products />} />
        <Route path="seller/users" element={<Users />} />
      </Route>
      <Route path="/dashboard" element={<AdminRoute />}>
        <Route path="admin" element={<AdminDashboard />} />
        <Route path="admin/products" element={<ProductsAdmin />} />
      </Route>
        
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/product/:slug" element={<ProductDetails />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/category/:slug" element={<CategoryProduct />} />
        <Route path="/search" element={<Search />} />
        <Route path="" element={<Dashboard />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/policy" element={<Policy />} />
        <Route path="*" element={<Pagenotfound />} />
      </Routes>
    </>
  );
}

export default App;