import * as React from 'react';
import { Link } from 'react-router-dom';
import { Typography, Button } from '@mui/material';
import Stack from '@mui/material/Stack';

const Logoutpage = () => {
  return (
    <Stack
      spacing={2}
      sx={{
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        alignContent: 'center',
        p: 1,
      }}
    >
      <Typography variant="h2" gutterBottom>
        Thanks for your visit!
      </Typography>
      <img alt="" src="../../static/img/thank_you_visit.png" width="300" />
      <Button variant="contained" component={Link} to="/users">
        Sign in Again
      </Button>
    </Stack>
  );
};

export default Logoutpage;
