import * as React from 'react';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { loginWithToken } from '../../store';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  Button,
} from '@mui/material';
import Stack from '@mui/material/Stack';

const UserProfile = () => {
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loginWithToken());
  }, []);

  // console.log(auth)

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
        Welcome {auth.username} !
      </Typography>
      <Stack
        sx={{
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'center',
          alignContent: 'center',
          p: 1,
        }}
      >
        <Typography variant="h4" gutterBottom>
          Profile
        </Typography>
        <Box
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-around',
          }}
        >
          <List sx={{ width: '100%', mr: '50px' }}>
            <ListItem>
              <ListItemText primary={`Username: ${auth.username}`} />
            </ListItem>
            <ListItem>
              <ListItemText primary={`First Name: ${auth.firstName || ''}`} />
            </ListItem>
            <ListItem>
              <ListItemText primary={`Last Name: ${auth.lastName || ''}`} />
            </ListItem>
            <ListItem>
              <ListItemText primary={`Email: ${auth.email}`} />
            </ListItem>
            <ListItem>
              <ListItemText primary={`Phone: ${auth.phone || ''}`} />
            </ListItem>
            <ListItem>
              <ListItemText primary={`Address: ${auth.address || ''}`} />
            </ListItem>
          </List>
          <img
            style={{
              resizeMode: 'center',
              height: '200px',
              width: '200px',
              marginLeft: '50px',
              borderRadius: '50%',
            }}
            src={
              auth.avatar
                ? auth.avatar
                : require('../../../static/img/avatar-placeholder.png')
            }
          />
        </Box>
        <Button
          variant="contained"
          component={Link}
          to={`/users/${auth.id}/profile/update`}
        >
          Edit
        </Button>
      </Stack>
    </Stack>
  );
};

export default UserProfile;
