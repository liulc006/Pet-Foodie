import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchCategories,
  fetchProducts,
  fetchCart,
  fetchRatings,
  loginWithToken,
  fetchOrders,
} from '../store';

import { ThemeProvider } from '@mui/material/styles';

import Home from './Global/Home';
import Nav from './Global/Nav';
import Footer from './Global/Footer';
import Theme from './Global/Theme';
import PageNotFound from './Global/PageNotFound';

import Login from './Login/Login';
import Logoutpage from './Login/Logoutpage';
import Register from './Login/Register';
import Welcome from './Login/Welcome';
import Forgotpswd from './Login/Forgotpswd';
import Resetpswd from './Login/Resetpswd';

import UserProfile from './User/UserProfile';
import UserProfileUpdate from './User/UserProfileUpdate';
import UserOrderhistory from './User/UserOrderhistory';

import Products from './Product/Products';
import Product from './Product/Product';

import AddRating from './Rating/AddRating';

import Cart from './Cart/Cart';
import Checkout from './Order/Checkout';
import OrderComplete from './Order/OrderComplete';

import Userlist from './Admin/Userlist';
import AdminProductslist from './Admin/AdminProductslist';

const App = () => {
  const dispatch = useDispatch();
  const { auth, cart } = useSelector((state) => state);

  useEffect(() => {
    dispatch(loginWithToken());
    dispatch(fetchProducts());
    dispatch(fetchCategories());
    dispatch(fetchRatings());
  }, []);

  useEffect(() => {
    if (auth.id) {
      dispatch(fetchCart());
    }
  }, [auth]);

  useEffect(() => {
    if (auth.id) {
      dispatch(fetchOrders());
    }
  }, [cart]);

  return (
    <ThemeProvider theme={Theme}>
      <Nav />
      <div style={{ minHeight: '67vh' }}>
        <Routes>
          {/* Login Routes */}
          <Route path="/register" element={<Register />}></Route>
          <Route path="/forgot-password" element={<Forgotpswd />}></Route>
          <Route
            path="/reset-password/:id/:token"
            element={<Resetpswd />}
          ></Route>
          <Route path="/welcome" element={<Welcome />}></Route>
          <Route path="/logout" element={<Logoutpage />}></Route>
          <Route path="/users" element={<Login />}></Route>
          {/* User Routes */}
          <Route path="/users/:id/profile" element={<UserProfile />}></Route>
          <Route
            path="/users/:id/profile/update"
            element={<UserProfileUpdate />}
          ></Route>
          <Route
            path="/users/:id/orders"
            element={<UserOrderhistory />}
          ></Route>
          {/* Product Routes */}
          <Route path="/products" element={<Products />}></Route>
          <Route path="/products/:id" element={<Product />}></Route>
          <Route path="/addRating/:id" element={<AddRating />}></Route>
          {/* Cart & Checkout routes */}
          <Route path="/cart" element={<Cart />}></Route>
          <Route path="/checkout" element={<Checkout />}></Route>
          <Route
            path="/orders/:id/complete"
            element={<OrderComplete />}
          ></Route>
          {/* Admin Routes */}
          <Route path="/admin/:id/users" element={<Userlist />}></Route>
          <Route
            path="/admin/:id/products"
            element={<AdminProductslist />}
          ></Route>
          {/* Global Routes */}
          <Route path="/" element={<Home />}></Route>
          <Route path="*" element={<PageNotFound />}></Route>
        </Routes>
      </div>
      <Footer />
    </ThemeProvider>
  );
};

export default App;
