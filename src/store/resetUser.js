
import axios from 'axios';

const resetUser = (state = { }, action)=> {
  if(action.type === 'SET_MESSAGE'){
    return action.message;
  }
  return state;
};

export const getandsendEmail = (email) => {
    return async(dispatch) => {
      const response = await axios.post('/forgot-password',{ email : email }) //get the data from this api
      dispatch({ type: 'SET_MESSAGE', message: {getUser: response.data.getUser, message: response.data.message} });
    }
  }

export const clearresetUser = ()=> {
  return { type: 'SET_MESSAGE', message: {} };
};

export default resetUser;

