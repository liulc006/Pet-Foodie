import React, { useState } from 'react';
import { attemptLogin } from '../../store';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import Visibility from '@mui/icons-material/Visibility';
import InputAdornment from '@mui/material/InputAdornment';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';

import OutlinedInput from '@mui/material/OutlinedInput';
// import LoginwithFacebook from './LoginwithFacebook';

const Loginwithcredentials = () => {
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const [error, setError] = useState('');
  // console.log(auth.msg)

  //get the credentials
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });

  const onChange = (ev) => {
    setCredentials({ ...credentials, [ev.target.name]: ev.target.value });
  };

  //send the credentials to the store
  const login = (ev) => {
    ev.preventDefault();
    dispatch(attemptLogin(credentials, navigate));
    // setError('Invalid Username or Password');
  };

  //control the hiden of pswd
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (ev) => {
    ev.preventDefault();
  };

  return (
    <Box
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      {auth.msg ? <Typography color="red">{auth.msg}</Typography> : null}
      <form
        onSubmit={login}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            margin: 'auto',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">Email</InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              value={credentials.email}
              onChange={onChange}
              name="email"
              label="Email"
            />
          </FormControl>

          <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">
              Password
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={showPassword ? 'text' : 'password'}
              value={credentials.password}
              onChange={onChange}
              name="password"
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
          </FormControl>
        </div>
        <Grid
          container
          sx={{
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center',
            marginBottom: '20px',
          }}
        >
          <Button variant="contained" onClick={login}>
            {' '}
            Sign in
          </Button>
          <Link
            variant="contained"
            component={RouterLink}
            to="/forgot-password"
            sx={{ fontSize: '13px' }}
          >
            Forgot Your Password?
          </Link>
        </Grid>
      </form>
    </Box>
  );
};

export default Loginwithcredentials;
