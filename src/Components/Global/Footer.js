import React from 'react';
import { styled } from '@mui/material/styles';
import { Typography, Grid } from '@mui/material';
import { Link } from 'react-router-dom';
const StyledFooter = styled('div')`
  position: fixed,
  bottom: 0,
  left:0,
  width: 100%;
  background-color: #303030;
  text-align: center;
  margin-top: 60;
  padding: 40 0;
`;

const Footer = () => {
  return (
    <StyledFooter>
      <Link to="/">
        <img
          src="../../static/img/pet_foodie_logo_landscape_2x.png"
          width="130"
        />
      </Link>
      <Typography variant="body1" color="fff" sx={{ my: 1 }}>
        Fullstack Academy - Grace Shopper Project
      </Typography>

      <Typography variant="body2" color="#d3d3d3" sx={{ my: 1 }}>
        Contributers:
      </Typography>
      <Grid container spacing={4} alignItems="center" justifyContent="center">
        <Grid item>
          <a
            href="mailto:swenonohu@gmail.com"
            style={{ color: '#fff', fontSize: '14px' }}
          >
            Nono Hu
          </a>
        </Grid>
        <Grid item>
          <a
            href="mailto:lmx4wo@gmail.com"
            style={{ color: '#fff', fontSize: '14px' }}
          >
            Max Li
          </a>
        </Grid>
        <Grid item>
          <a
            href="mailto:123@gmail.com"
            style={{ color: '#fff', fontSize: '14px' }}
          >
            Lok Cheung
          </a>
        </Grid>
        <Grid item>
          <a
            href="mailto:lucaliu96@gmail.com"
            style={{ color: '#fff', fontSize: '14px' }}
          >
            Luca Liu
          </a>
        </Grid>
      </Grid>
    </StyledFooter>
  );
};

export default Footer;
