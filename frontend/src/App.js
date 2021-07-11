import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import axios from 'axios';
// Stripe Payment
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Home from './components/Home';
import ProductDetails from './components/product/ProductDetails';
import { loadUser } from './actions/userActions';
import store from './store';
import ProtectedRoute from './components/route/ProtectedRoute';
// Cart Imports
import Cart from './components/cart/Cart';
import Shipping from './components/cart/Shipping';
import ConfirmOrder from './components/cart/ConfirmOrder';
import Payment from './components/cart/Payment';
import OrderSuccess from './components/cart/OrderSuccess';
// Order Imports
import ListOrders from './components/order/ListOrders';
import OrderDetails from './components/order/OrderDetails';
// Auth or User Imports
import Login from './components/user/Login';
import Register from './components/user/Register';
import Profile from './components/user/Profile';
import UpdateProfile from './components/user/UpdateProfile';
import UpdatePassword from './components/user/UpdatePassword';
import ForgotPassword from './components/user/ForgotPassword';
import NewPassword from './components/user/NewPassword';
// Admin Imports
import Dashboard from './components/admin/Dashboard';
import ProductList from './components/admin/ProductList';
import NewProduct from './components/admin/NewProduct';
import UpdateProduct from './components/admin/UpdateProduct';
import OrdersList from './components/admin/OrdersList';
import ProcessOrder from './components/admin/ProcessOrder';
import UsersList from './components/admin/UsersList';
import UpdateUser from './components/admin/UpdateUser';
import ProductReview from './components/admin/ProductReview';

import './App.css';

function App() {
  const [stripeApiKey, setStripeApiKey] = useState('');

  const { user, isAuthenticated, loading } = useSelector(state => state.auth);

  async function getStripeApiKey() {
    const { data } = await axios.get('/api/v1/stripeapi');
    setStripeApiKey(data.stripeApiKey);
  };

  useEffect(() => {
    store.dispatch(loadUser());
    getStripeApiKey();
  }, []);

  return (
    <Router>
      <div className="App">
        <Header />

        <div className="container container-fluid">
          <Route path="/" exact component={Home} />
          <Route path="/search/:keyword" component={Home} />
          <Route path="/product/:id" exact component={ProductDetails} />
          <Route path="/login" exact component={Login} />
          <Route path="/register" exact component={Register} />
          <Route path="/password/forgot" exact component={ForgotPassword} />
          <Route path="/password/reset/:token" exact component={NewPassword} />
          <ProtectedRoute path="/cart" exact component={Cart} />
          <ProtectedRoute path="/shipping" exact component={Shipping} />
          {stripeApiKey && 
            <Elements stripe={loadStripe(stripeApiKey)}>
              <ProtectedRoute path="/payment" exact component={Payment} />
            </Elements>
          }
          <ProtectedRoute path="/confirm" exact component={ConfirmOrder} />
          <ProtectedRoute path="/me" exact component={Profile} />
          <ProtectedRoute path="/success" exact component={OrderSuccess} />
          <ProtectedRoute path="/orders/me" exact component={ListOrders} />
          <ProtectedRoute path="/order/:id" exact component={OrderDetails} />
          <ProtectedRoute path="/me/update" exact component={UpdateProfile} />
          <ProtectedRoute path="/password/update" exact component={UpdatePassword} />
        </div>

        <ProtectedRoute path="/dashboard" exact isAdmin={true} component={Dashboard} />
        <ProtectedRoute path="/admin/products" exact isAdmin={true} component={ProductList} />
        <ProtectedRoute path="/admin/product" exact isAdmin={true} component={NewProduct} />
        <ProtectedRoute path="/admin/product/:id" exact isAdmin={true} component={UpdateProduct} />
        <ProtectedRoute path="/admin/orders" exact isAdmin={true} component={OrdersList} />
        <ProtectedRoute path="/admin/order/:id" exact isAdmin={true} component={ProcessOrder} />
        <ProtectedRoute path="/admin/users" exact isAdmin={true} component={UsersList} />
        <ProtectedRoute path="/admin/user/:id" exact isAdmin={true} component={UpdateUser} />
        <ProtectedRoute path="/admin/reviews" exact isAdmin={true} component={ProductReview} />
        
        {!loading && (!isAuthenticated || user.role !== 'admin') && (
          <Footer />
        )}
        
      </div>
    </Router>
  );
}

export default App;
