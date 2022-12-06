import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { getTotalQuantity } from '../../store';
import { styled } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Card from '@mui/material/CardMedia';
import Badge from '@mui/material/Badge';
import SignInTab from './SignInTab';

const StyledBadge = styled(Badge)(({}) => ({
  '& .MuiBadge-badge': {
    right: -3,
    top: 3,
    padding: '0 4px',
    /* border: `2px solid ${theme.palette.background.paper}` */
  },
}));

/* mobile menu db & setup starts */
const mobileNavItems = [
  {
    menuTitle: 'Home',
    pageURL: '/',
  },
  {
    menuTitle: 'Products',
    pageURL: '/products',
  },
  {
    menuTitle: 'Cart',
    pageURL: '/cart',
  },
  {
    menuTitle: 'User',
    pageURL: '/users',
  },
];

const drawerWidth = 240;
/* mobile menu ends*/

const Nav = ({ window }) => {
  const {
    auth,
    cart: { lineItems },
  } = useSelector((state) => state);

  const badgeContent = (items) => {
    return auth.id ? getTotalQuantity(items) : 0;
  };

  const { pathname } = useLocation();

  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <img
        alt="Pet Foodie"
        src="../../static/img/pet_foodie_logo_portrait_2x.png"
        width="128"
        height="128"
      />
      <Divider />
      <List>
        {mobileNavItems.map((item, idx) => {
          const { menuTitle, pageURL } = item;
          return (
            <ListItemButton
              key={idx}
              sx={{ textAlign: 'center' }}
              component={Link}
              to={pageURL}
              primary={menuTitle}
              selected={pageURL === pathname}
            >
              <ListItemText primary={menuTitle} />
            </ListItemButton>
          );
        })}
      </List>
    </Box>
  );
  /* end of mobile menu */

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <div style={{ marginBottom: 140 }}>
      {/* <Box sx={{ display: 'flex', m: 0, height: 120 }}> */}
      <AppBar component="nav" sx={{ height: 80 }} elevation={0}>
        <Toolbar>
          {/* IconButton mobile only */}
          <IconButton
            color="inherit"
            aria-label="See Menu"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ flex: 1, height: 80, width: 60, display: { sm: 'none' } }}
          >
            <MenuIcon sx={{ height: 40, width: 40 }} />
          </IconButton>

          <Card
            sx={{
              mr: 3,
              flex: 1,
              display: { xs: 'none', sm: 'block' },
            }}
          >
            <Link to="/">
              <img
                src="../../static/img/pet_foodie_logo_landscape_2x.png"
                alt="Pet Foodie"
                height="80"
              />
            </Link>
          </Card>
          <Box
            sx={{
              display: { xs: 'none', sm: 'flex' },
              flex: 4,
              justifyContent: 'space-around',
              alignItems: 'center',
            }}
          >
            <ListItemButton
              component={Link}
              to="/"
              color="#fff"
              sx={{ textAlign: 'center' }}
            >
              <ListItemText primary={'HOME'} />
            </ListItemButton>
            <ListItemButton
              component={Link}
              to="/products"
              color="#fff"
              sx={{ textAlign: 'center' }}
            >
              <ListItemText primary={'PRODUCTS'} />
            </ListItemButton>
            <ListItemButton
              component={Link}
              to="/cart"
              color="#fff"
              sx={{ textAlign: 'center' }}
            >
              <ListItemText>
                <StyledBadge
                  badgeContent={badgeContent(lineItems)}
                  color="secondary"
                >
                  CART <ShoppingCartIcon sx={{ ml: 0.5 }} />
                </StyledBadge>
              </ListItemText>
            </ListItemButton>
            {/* <ListItemButton
              component={Link}
              to="/users"
              sx={{ textAlign: 'center' }}
            > */}
            {/*  primaryTypographyProps={{ fontSize: '18px', fontWeight: '500' }}*/}
            {/* <ListItemText>
                {auth.id ? `HELLO, ${auth.username}!` : 'SIGN IN'}
              </ListItemText> */}
            {/* </ListItemButton> */}

            <SignInTab />
          </Box>
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </div>
  );
};

export default Nav;
