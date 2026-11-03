import { useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Products from "./pages/products/Products";
import Product1 from "./pages/products/Product1";
import AddProduct from "./pages/products/AddProduct";
import EditProduct from "./pages/products/EditProduct";
import ProductDetails from "./pages/products/ProductDetails";

import Orders from "./pages/orders/Orders";
import Users from "./pages/users/Users";
import AddUser from "./pages/users/AddUser";
import UserDetails from "./pages/users/UserDetails";
import EditUser from "./pages/users/EditUser";
import Dashboard from "./pages/dashboard/Dashboard";
import AdminLayout from "./layouts/AdminLayout";
import ProtectedRoute from "./routes/ProtectedRoute";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Profile from "./pages/profile/Profile";
import Categories from "./pages/category/Categories";
import AddCategory from "./pages/category/AddCategory";
import EditCategory from "./pages/category/EditCategory";
import CategoryDetails from "./pages/category/CategoryDetails";
// import { Route } from "lucide-react";
function App() {
  return (
    // <BrowserRouter>
    //   <AdminLayout>
    //     <Routes>
    //       <Route path="/" element={<Dashboard />} />
    //       <Route path="/products" element={<Products />} />
    //       <Route path="/orders" element={<Orders />} />
    //       <Route path="/users" element={<Users />} />
    //       <Route path="/product1" element={<Product1 />} />
    //     </Routes>
    //   </AdminLayout>
    // </BrowserRouter>

    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<ProtectedRoute />}>
          <Route element={<AdminLayout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/add" element={<AddProduct />}></Route>
            <Route path="/products/edit/:id" element={<EditProduct />} />
            <Route path="/products/:id" element={<ProductDetails />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/users" element={<Users />} />
            <Route path="/users/add" element={<AddUser />} />
            <Route path="/users/:id" element={<UserDetails />} />
            <Route path="/users/edit/:id" element={<EditUser />} />
            <Route path="/users/add" element={<AddUser />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/categories/add" element={<AddCategory />} />
            <Route path="/categories/edit/:id" element={<EditCategory />} />
            <Route path="/categories/:id" element={<CategoryDetails />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
