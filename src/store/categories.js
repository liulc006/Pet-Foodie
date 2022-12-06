import axios from "axios";

const categories = (state = [], action) => {
  if (action.type === "SET_CATEGORIES") {
    return action.categories;
  }
  return state;
};

// action creators

const setCategories = (categories) => {
  return {
    type: "SET_CATEGORIES",
    categories,
  };
};

export const fetchCategories = () => {
  return async (dispatch) => {
    const response = await axios.get("/api/categories");
    dispatch(setCategories(response.data));
  };
};

export default categories;
