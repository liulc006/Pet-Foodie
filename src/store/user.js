import axios from 'axios';

const user = (state = [], action) => {
  if (action.type === 'GET_USERS') {
    return action.users;
  }
  if (action.type === 'SET_USER') {
    return action.user;
  }
  if (action.type === 'UPDATE_USER') {
    return state.map((user) =>
      user.id === action.user.id ? action.user : user
    );
  }
  return state;
};

export const getUsers = () => {
  return async (dispatch) => {
    const response = await axios.get('/api/users');
    dispatch({ type: 'GET_USERS', users: response.data });
  };
};

export const fetchUser = (userinput, navigate) => {
  return async (dispatch) => {
    const response = await axios.post('/api/users', userinput);
    dispatch({ type: 'SET_USER', user: response.data });
    navigate('/users');
  };
};

export const updateUserinfo = (inputs, id, navigate) => {
  return async (dispatch) => {
    const { data } = await axios.put(`/api/users/${id}`, inputs);
    dispatch({ type: 'UPDATE_USER', user: response.data });
    navigate(`/users/${id}/profile`);
  };
};

export const updateAddress = (inputs, id) => {
  return async (dispatch) => {
    const response = await axios.put(`/api/users/${id}`, inputs);
    dispatch({ type: 'UPDATE_USER', user: response.data });
  };
};

export const updateAdmin = (val, id) => {
  return async (dispatch) => {
    const response = await axios.put(`/api/users/${id}`, { isAdmin: val });
    dispatch({ type: 'UPDATE_USER', user: response.data });
  };
};

export const setUserpswd = ({ id, token }, input, navigate) => {
  return async (dispatch) => {
    const response = await axios.put(`/reset-password/${id}/${token}`, input);
    dispatch({ type: 'UPDATE_USER', user: response.data });
    navigate('/users');
  };
};

export default user;
