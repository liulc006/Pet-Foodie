import * as React from 'react';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../../store';

export default function SignInTab() {
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Toolbar>
      {auth.id ? (
        <div>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit"
          >
            <Avatar alt={auth.fullName} src={auth.avatar}>
              {auth.username[0].toUpperCase()}
            </Avatar>
            {/*  <AccountCircle /> */}
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            py={20}
            sx={{
              display: 'flex',
              direction: 'row',
              borderRadius: 1,
              mt: 1,
            }}
            spacing={3}
          >
            {/* <MenuItem onClick={handleClose}>HELLO, {auth.username}</MenuItem> */}
            {auth.isAdmin ? (
              <div key="admin">
                <MenuItem onClick={handleClose}>
                  <Typography color="red">Admin Account</Typography>
                </MenuItem>
                <MenuItem
                  onClick={handleClose}
                  component={Link}
                  to={`/admin/${auth.id}/products`}
                >
                  <Typography color="green">Product List</Typography>
                </MenuItem>
                <MenuItem
                  onClick={handleClose}
                  component={Link}
                  to={`/admin/${auth.id}/users`}
                >
                  <Typography color="green">User List</Typography>
                </MenuItem>
              </div>
            ) : (
              ''
            )}
            <MenuItem
              onClick={handleClose}
              component={Link}
              to={`/users/${auth.id}/profile`}
              style={{ marginBottom: '5' }}
            >
              User Profile
            </MenuItem>
            <MenuItem
              onClick={handleClose}
              component={Link}
              to={`/users/${auth.id}/orders`}
              style={{ marginBottom: '10' }}
            >
              Order History
            </MenuItem>
            <Box textAlign="center" mb={10} style={{ marginBottom: '5' }}>
              <Button
                variant="contained"
                size="small"
                onClick={() => {
                  handleClose(), dispatch(logout(navigate));
                }}
              >
                Logout
              </Button>
            </Box>
          </Menu>
        </div>
      ) : (
        <div>
          {/* Nono added item button to wrap the text */}
          <ListItemButton onClick={handleMenu}>
            <ListItemText>SIGN IN</ListItemText>
          </ListItemButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            sx={{
              display: 'flex',
              direction: 'row',
              borderRadius: 1,
              mt: 1,
            }}
          >
            <MenuItem
              onClick={handleClose}
              component={Link}
              to="/users"
              style={{ marginBottom: '5' }}
            >
              Sign in
            </MenuItem>
            {/* <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-around',
                  alignItems: 'center',
                  p: 1,
                  borderRadius: 1,
                }}
              >
                <Typography variant="h6" gutterBottom>
                  Return Customer
                </Typography>
                <Button variant="contained" component={Link} to="/users">
                  Login
                </Button>
              </Box> */}
            <MenuItem
              onClick={handleClose}
              component={Link}
              to="/register"
              style={{ marginBottom: '5' }}
            >
              Register
            </MenuItem>
            {/* <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-around',
                  alignItems: 'center',
                  justifyItems: 'center',
                  p: 1,
                  borderRadius: 1,
                }}
              >
                <Box>
                  <Typography variant="h6" gutterBottom>
                    New Customer
                  </Typography>
                </Box>
                <Box>
                  <Button variant="contained" component={Link} to="/register">
                    Register
                  </Button>
                </Box>
              </Box> */}

            {/* <MenuItem onClick={handleClose}>
              <Box>
                <Link to="/forgot-password">Forgot your password?</Link>
              </Box>
            </MenuItem> */}
          </Menu>
        </div>
      )}
    </Toolbar>
  );
}
