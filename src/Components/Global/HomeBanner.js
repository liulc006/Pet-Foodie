import React from 'react';
import { styled } from '@mui/material/styles';
import { Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
const StyledBanner = styled('div')`
  position: relative;
  width: 100%;
  height: 35%;
  margin-top: -70;
  margin-buttom: 40;
  padding: 30 0;
  background-image: url('../../static/img/home_banner_1.png');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  display: block;
  transition: opacity 3s;
`;
const StyleContent = styled('div')`
  text-align: center;
  position: absolute;
  top: 25%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
const Banner = () => {
  const navigate = useNavigate();
  return (
    <StyledBanner>
      <StyleContent>
        <Typography variant='h1' sx={{ my: 4 }}>
          Pleasure in Every Bite
        </Typography>
        <Button
          variant='contained'
          color='secondary'
          onClick={() => navigate('/products')}
        >
          go shopping
        </Button>
      </StyleContent>
    </StyledBanner>
  );
};

export default Banner;
