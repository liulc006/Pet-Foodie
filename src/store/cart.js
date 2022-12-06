import axios from 'axios';
const cart = (state = { lineItems: [] }, action) => {
  if (action.type === 'SET_CART') {
    return {
      ...action.cart,
      lineItems: action.cart.lineItems.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      ),
    };
  }
  return state;
};

export const fetchCart = () => {
  return async (dispatch) => {
    const token = window.localStorage.getItem('token');
    const response = await axios.get('/api/orders/cart', {
      headers: {
        authorization: token,
      },
    });
    dispatch({ type: 'SET_CART', cart: response.data });
  };
};

export const addToCart = (product, quantity, navigate) => {
  return async (dispatch) => {
    const token = window.localStorage.getItem('token');
    if (!token) navigate('/users');
    else {
      const response = await axios.post(
        '/api/orders/cart',
        {
          product,
          quantity,
        },
        {
          headers: {
            authorization: token,
          },
        }
      );
      dispatch({ type: 'SET_CART', cart: response.data });
    }
  };
};

export const removeFromCart = (product, quantity) => {
  return async (dispatch) => {
    const token = window.localStorage.getItem('token');
    const response = await axios.put(
      '/api/orders/cart',
      {
        product: product,
        quantityToRemove: quantity,
      },
      {
        headers: {
          authorization: token,
        },
      }
    );
    dispatch({ type: 'SET_CART', cart: response.data });
  };
};
export const getSubtotal = (lineItems) => {
  return parseFloat(
    lineItems.reduce(
      (sum, lineItem) => sum + lineItem.quantity * lineItem.product.price,
      0
    )
  ).toFixed(2);
};

export const getTotalQuantity = (lineItems) => {
  return lineItems.reduce((acc, lineitem) => acc + lineitem.quantity, 0);
};

export const placeOrder = (orderTotal, navigate) => {
  return async (dispatch) => {
    const token = window.localStorage.getItem('token');
    const response = await axios.post(
      '/api/orders',
      { orderTotal: orderTotal },
      {
        headers: { authorization: token },
      }
    );
    dispatch({ type: 'SET_CART', cart: { lineItems: [] } });
    navigate(`/orders/${response.data.id}/complete`);
  };
};

export default cart;
