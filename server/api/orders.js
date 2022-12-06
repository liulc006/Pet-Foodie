const express = require('express');
const app = express.Router();
const { User, LineItem } = require('../db');
const { Order } = require('../db');
//middleware chaining
const { isLoggedIn } = require('./middleware');

//stripe:
require('dotenv').config();
const Stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
var cors = require('cors');

app.use(cors());

module.exports = app;

/* /api/orders */
app.post('/', isLoggedIn, async (req, res, next) => {
  try {
    res.send(await req.user.createOrder(req.body));
  } catch (ex) {
    next(ex);
  }
});

app.get('/', isLoggedIn, async (req, res, next) => {
  try {
    res.send(await req.user.getOrders());
  } catch (ex) {
    next(ex);
  }
});
/* /api/orders/cart */
app.get('/cart', isLoggedIn, async (req, res, next) => {
  try {
    res.send(await req.user.getCart());
  } catch (ex) {
    next(ex);
  }
});

app.post('/cart', isLoggedIn, async (req, res, next) => {
  try {
    res.send(await req.user.addToCart(req.body));
  } catch (ex) {
    next(ex);
  }
});

app.put('/cart', isLoggedIn, async (req, res, next) => {
  try {
    res.send(await req.user.removeFromCart(req.body));
  } catch (ex) {
    next(ex);
  }
});

app.post('/payment', async (req, res) => {
  let status, error;
  const { token, amount } = req.body;
  try {
    await Stripe.charges.create({
      source: token.id,
      amount,
      currency: 'usd',
    });
    status = 'success';
  } catch (error) {
    console.log(error);
    status = 'Failure';
  }
  res.json({ error, status });
});
