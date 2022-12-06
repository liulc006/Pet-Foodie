import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { setUserpswd } from '../../store';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import InputAdornment from '@mui/material/InputAdornment';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Input from '@mui/material/Input';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const Resetpswd = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id, token } = useParams();

  // console.log({id, token})

  const [inputs, setInputs] = useState({
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
      dispatch(
        setUserpswd({ id, token }, { password: inputs.password }, navigate)
      );
      // console.log('hi')
    } else {
      alert('Please type in the same password!');
    }
  };
  return (
    <div
      style={{
        with: 'auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <Typography variant="h5" gutterBottom sx={{ mx: '15px' }}>
        Please set your new password
      </Typography>
      <form
        onSubmit={onsubmit}
        style={{
          with: 'auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Input
          type={showPassword ? 'text' : 'password'}
          value={inputs.password}
          placeholder="New password"
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
          placeholder="Confrim new password"
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
        <Button variant="contained" sx={{ width: '30%' }} onClick={onsubmit}>
          {' '}
          Reset
        </Button>
      </form>
    </div>
  );
};

export default Resetpswd;
