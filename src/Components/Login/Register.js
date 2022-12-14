import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { fetchUser } from '../../store';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import InputAdornment from '@mui/material/InputAdornment';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Input from '@mui/material/Input';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    username: '',
    email: '',
    password: '',
    password_confirm: '',
  });

  const onChange = (ev) => {
    setInputs({ ...inputs, [ev.target.name]: ev.target.value });
  };

  //control the hiden of pswd
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (ev) => {
    ev.preventDefault();
  };

  const onsubmit = (ev) => {
    ev.preventDefault();
    if (inputs.password === inputs.password_confirm) {
      const userinput = {
        username: inputs.username,
        password: inputs.password,
        email: inputs.email,
      };
      dispatch(fetchUser(userinput, navigate));
    } else {
      alert("The password confirmation doesn't match");
    }
  };
  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Typography variant="h2" mb={3}>
        New User Sign up
      </Typography>
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        divider={<Divider orientation="vertical" flexItem />}
        spacing={{ xs: 1, sm: 2, md: 4 }}
        sx={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Box
          sx={{
            // width: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Typography variant="h5">Create an Account</Typography>
          <form
            onSubmit={onsubmit}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <div
              style={{
                margin: '20px',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <Input
                value={inputs.username}
                placeholder="Username"
                name="username"
                onChange={onChange}
              />
              <Input
                value={inputs.email}
                placeholder="Email"
                name="email"
                onChange={onChange}
              />
              <Input
                type={showPassword ? 'text' : 'password'}
                value={inputs.password}
                placeholder="Password"
                name="password"
                onChange={onChange}
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
              />
              <Input
                type={showPassword ? 'text' : 'password'}
                value={inputs.password_confirm}
                placeholder="Confirm Password"
                name="password_confirm"
                onChange={onChange}
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
              />
            </div>
            <Button
              variant="contained"
              sx={{ width: '75%' }}
              onClick={onsubmit}
            >
              Create an Account
            </Button>
          </form>
        </Box>

        <div
          style={{
            margin: '20px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography variant="h5" mb={3}>
            Already have an Account?
          </Typography>
          <Link to="/users" style={{ textDecoration: 'none' }}>
            <Button variant="contained"> Sign in</Button>
          </Link>
        </div>
      </Stack>
    </Box>
  );
};

export default Register;
