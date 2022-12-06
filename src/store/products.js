import axios from "axios";

const products = (state = [], action) => {
  if (action.type === "SET_PRODUCTS") {
    return action.products;
  }
  return state;
};

// action creators

const setProducts = (products) => {
  return {
    type: "SET_PRODUCTS",
    products,
  };
};

export const fetchProducts = () => {
  return async (dispatch) => {
    const response = await axios.get("/api/products");
    dispatch(setProducts(response.data));
  };
};

export default products;
