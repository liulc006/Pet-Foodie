import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const Welcome = () => {
  return (
    <div
      style={{
        margin: 'auto',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
      }}
    >
      <Typography variant="h4" gutterBottom>
        Thanks for being our valuable customer!
      </Typography>
      <Button variant="contained" component={Link} to="/users">
        Signin
      </Button>
    </div>
  );
};

export default Welcome;
