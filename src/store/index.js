import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import auth from './auth';
import cart from './cart';
import products from './products';
import user from './user';
import resetUser from './resetUser';
import categories from './categories';
import ratings from './rating';
import orders from './orders';

const reducer = combineReducers({
  auth,
  cart,
  products,
  user,
  resetUser,
  categories,
  ratings,
  orders,
});

const store = createStore(reducer, applyMiddleware(thunk, logger));

export default store;

export * from './auth';
export * from './cart';
export * from './products';
export * from './user';
export * from './resetUser';
export * from './categories';
export * from './rating';
export * from './orders';
