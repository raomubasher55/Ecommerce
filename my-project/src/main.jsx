import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import HomePage from './Pages/HomePage.jsx';
import Contact from './Pages/Contact.jsx';
import About from './Pages/About.jsx';
import Policy from './Pages/Policy.jsx';
import PageNotFound from './Pages/PageNotFound.jsx';
import Signup from './Pages/Auth/Signup.jsx';
import Login from './Pages/Auth/Login.jsx';
import Dashboard from './Pages/user/Dashboard.jsx';
import Private from './Components/Routes/Private.jsx';
import ForgetPassword from './Pages/Auth/ForgetPassword.jsx';
import AdminDashboard from './Pages/Admin/AdminDashboard.jsx';
import AdminRoute from './Components/Routes/AdminRoute.jsx';
import CreateCategory from './Pages/Admin/CreateCategory.jsx';
import CreateProduct from './Pages/Admin/CreateProduct.jsx';
import Users from './Pages/Admin/Users.jsx';
import Profile from './Pages/user/Profile.jsx';
import Orders from './Pages/user/Orders.jsx';
import Products from './Pages/Admin/Products.jsx';
import UpdateProduct from './Pages/Admin/UpdateProduct.jsx';
import Search from './Pages/Search.jsx';
import ProductDetail from './Pages/ProductDetail.jsx';
import AllCategories from './Pages/AllCategories.jsx';
import CategoryProducts from './Pages/CategoryProducts.jsx';
import Cart from './Pages/Cart.jsx';


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<HomePage />} />
      <Route path="dashboard" element={<Private />}>
        <Route path='user/profile' element={<Profile />} />
        <Route path='user/orders' element={<Orders />} />
        {/* <Route path='user' element={<Dashboard />} /> */}
        <Route path='user' element={<Dashboard />} />
      </Route>
      <Route path="dashboard" element={<AdminRoute />}>
        <Route path='admin' element={<AdminDashboard />} />
        <Route path='admin/users' element={<Users />} />
        <Route path='admin/create-category' element={<CreateCategory />} />
        <Route path='admin/create-product' element={<CreateProduct />} />
        <Route path='admin/product/:slug' element={<UpdateProduct />} />
        <Route path='admin/products' element={<Products />} />
      </Route>
      <Route path="contact" element={<Contact />} />
      <Route path="search" element={<Search />} />
      <Route path="product/:slug" element={<ProductDetail />} />
      <Route path="categories" element={<AllCategories />} />
      <Route path="category/:slug" element={<CategoryProducts />} />
      <Route path="category/:slug" element={<CategoryProducts />} />
      <Route path="cart" element={<Cart />} />
      <Route path="about" element={<About />} />
      <Route path="policy" element={<Policy />} />
      <Route path="signup" element={<Signup />} />
      <Route path="login" element={<Login />} />
      <Route path="forget-password" element={<ForgetPassword />} />
      <Route path="*" element={<PageNotFound />} />
      {/* ... etc. */}
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* <CategoryProvider> */}
    {/* <AuthProvider>/ */}
    {/* <ProductProvider> */}
    <RouterProvider router={router} />
    {/* </ProductProvider> */}
    {/* </AuthProvider> */}
    {/* </CategoryProvider> */}
  </React.StrictMode>
);
