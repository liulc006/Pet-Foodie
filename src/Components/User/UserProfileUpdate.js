import * as React from 'react';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Box from '@mui/material/Box';
import { Typography, List, ListItem, Button } from '@mui/material';
import Stack from '@mui/material/Stack';
import Input from '@mui/material/Input';
import { useNavigate, useParams } from 'react-router-dom';
import { updateUserinfo, loginWithToken } from '../../store';
import AvatarPicture from './AvatarPicture';

const UserProfileUpdate = () => {
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const [inputs, setInputs] = React.useState({
    username: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
  });

  var authinputs = {};
  for (let k in inputs) {
    authinputs[k] = auth[k];
  }

  useEffect(() => {
    dispatch(loginWithToken());
    setInputs(authinputs);
  }, []);

  const onChange = (ev) => {
    setInputs({
      ...inputs,
      [ev.target.name]: ev.target.value,
    });
  };

  // console.log(inputs)

  const update = (ev) => {
    ev.preventDefault();
    dispatch(updateUserinfo(inputs, id, navigate));
  };

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
          Update Your Profile
        </Typography>
        <Box
          style={{
            with: 'auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <List
          // sx={{ width: '400px'}}
          // onClick = {update}
          >
            {Object.keys(inputs).map((item) => {
              return (
                <ListItem
                  key={item}
                  style={{
                    with: 'auto',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <Typography variant="h6" gutterBottom sx={{ mx: '15px' }}>
                    {item}:
                  </Typography>
                  <Input
                    sx={{ width: '250px' }}
                    placeholder={auth[item]}
                    name={item}
                    value={inputs.item}
                    onChange={onChange}
                  />
                </ListItem>
              );
            })}
          </List>

          <Box>
            <AvatarPicture />
          </Box>
        </Box>
        <Button
          sx={{ width: '30%', m: 'auto' }}
          variant="contained"
          onClick={update}
        >
          Submit
        </Button>
      </Stack>
    </Stack>
  );
};

export default UserProfileUpdate;
