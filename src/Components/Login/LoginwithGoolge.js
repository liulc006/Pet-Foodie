import React, { useEffect } from 'react';
import jwtDecode from 'jwt-decode';
import { useDispatch } from 'react-redux';
import { loginwithGoogle } from '../../store';
import { useNavigate } from 'react-router-dom';

const LoginwithGoogle = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleCallbackResponse = (response) => {
    // console.log(response.credential)
    const userinfo = jwtDecode(response.credential);
    // console.log(userinfo)
    const credentials = {
      username: userinfo.name,
      email: userinfo.email,
      password: userinfo.given_name + 'pswd4google',
    };
    // console.log(credentials)
    dispatch(loginwithGoogle(credentials, navigate));
  };

  useEffect(() => {
    /* golabal google */
    google.accounts.id.initialize({
      client_id:
        '400380762205-lh0vb6fc7obu9n7jrjus3tivb8k3568d.apps.googleusercontent.com',
      callback: handleCallbackResponse,
    });

    google.accounts.id.renderButton(document.getElementById('signInDiv'), {
      theme: 'outline',
      size: 'large',
    });
  }, []);
  return <div id="signInDiv"></div>;
};

export default LoginwithGoogle;
