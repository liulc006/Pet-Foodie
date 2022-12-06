import axios from 'axios';
const auth = (state = {}, action) => {
  if (action.type === 'SET_AUTH') {
    return action.auth;
  }
  return state;
};


export const updateAuth = (auth)=> {
  return async(dispatch)=> {
    const token = window.localStorage.getItem('token');
    const response = await axios.put('/api/auth/UpdateAvatar', auth, {
      headers: {
        authorization: token
      }
    });
    dispatch({ type: 'SET_AUTH', auth: response.data });
  };
};

export const logout = (navigate)=> {
  window.localStorage.removeItem('token');
  navigate('/logout');
  return { type: 'SET_AUTH', auth: {} };
};

export const loginWithToken = () => {
  return async (dispatch) => {
    const token = window.localStorage.getItem('token');
    // console.log(token)
    if (token) {
      const response = await axios.get('/api/auth', {
        headers: {
          authorization: token,
        },
      });
      dispatch({ type: 'SET_AUTH', auth: response.data });
    }
  };
};

export const attemptLogin = (credentials, navigate) => {
  return async (dispatch) => {
    const response = await axios.post('/api/auth', credentials);
    console.log (response.data)
    if(response.data.token){
      window.localStorage.setItem('token', response.data.token);
      dispatch(loginWithToken());
      navigate('/');
    }else{
      dispatch({ type: 'SET_AUTH', auth: {msg: response.data.msg} });
    }
  };
};

export const loginwithGoogle = (credentials, navigate) => {
  return async (dispatch) => {
    const response = await axios.post('/api/auth/google', credentials);
    // console.log(response.data)
    window.localStorage.setItem('token', response.data);
    dispatch(loginWithToken());
    navigate('/');
  };
};

export default auth;
