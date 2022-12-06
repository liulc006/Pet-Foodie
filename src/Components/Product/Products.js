import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import ProductsList from './ProductsList';
import {
  Container,
  Grid,
  TextField,
  FormControlLabel,
  Checkbox,
  Typography,
  Button,
  Stack,
} from '@mui/material';

const Products = () => {
  const { products } = useSelector((state) => state);
  const dispatch = useDispatch();

  const location = useLocation();
  const { preset } = location.state || '';

  useEffect(() => {
    window.scrollTo(0, 0);
    if (preset) setFilters([preset]);
  }, []);

  const options = [
    'Cat',
    'Dog',
    'Wet Food',
    'Dry Food',
    'Baby',
    'Adult',
    'Senior',
  ];

  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState([]);

  const handleChange = (option, e) => {
    let list = filters;
    if (list.indexOf(option) > -1) list.splice(list.indexOf(option), 1);
    else list.push(option);
    setFilters([...list]);
  };

  const resetFilters = () => {
    setFilters([]);
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const petFilteredProducts =
    filters.indexOf('Cat') < 0 && filters.indexOf('Dog') < 0
      ? products
      : products.filter((product) => filters.includes(product.animal));

  const foodFormFilteredProducts =
    filters.indexOf('Wet Food') < 0 && filters.indexOf('Dry Food') < 0
      ? petFilteredProducts
      : petFilteredProducts.filter((product) =>
          filters.includes(product.foodForm)
        );

  const lifestageFilteredProducts =
    filters.indexOf('Baby') < 0 &&
    filters.indexOf('Adult') < 0 &&
    filters.indexOf('Senior') < 0
      ? foodFormFilteredProducts
      : foodFormFilteredProducts.filter((product) =>
          filters.includes(product.lifeStage)
        );

  const searchedProducts =
    search === ''
      ? lifestageFilteredProducts
      : lifestageFilteredProducts.filter((product) => {
          return product.name.toLowerCase().includes(search.toLowerCase());
        });

  const showNum = (option) => {
    if (option === 'Cat' || option === 'Dog')
      return products.filter((product) => product.animal === option).length;
    if (option === 'Wet Food' || option === 'Dry Food')
      return petFilteredProducts.filter(
        (product) => product.foodForm === option
      ).length;
    if (option === 'Baby' || option === 'Adult' || option === 'Senior')
      return foodFormFilteredProducts.filter(
        (product) => product.lifeStage === option
      ).length;
  };

  return (
    <div>
      <Typography variant="h2" align="center" m={6}>
        Spoil your Pets with Top Brands
      </Typography>
      <Container>
        <Grid container spacing={2}>
          <Grid item xs={4} sm={3} md={2}>
            <TextField
              id="search"
              label="Search"
              variant="outlined"
              onChange={(e) => handleSearch(e)}
            />

            {options.map((option, index) => {
              // let num = 0;
              // if (products)
              //   num = products.filter(
              //     (product) =>
              //       product.animal === option ||
              //       product.foodForm === option ||
              //       product.lifeStage === option
              //   ).length;

              return (
                <div key={option}>
                  {index === 0 && (
                    <>
                      <Typography variant="h6" style={{ marginTop: '10px' }}>
                        Pet
                      </Typography>
                      <hr></hr>
                    </>
                  )}
                  {index === 2 && (
                    <>
                      <Typography variant="h6" style={{ marginTop: '10px' }}>
                        Food Form
                      </Typography>
                      <hr></hr>
                    </>
                  )}
                  {index === 4 && (
                    <>
                      <Typography variant="h6" style={{ marginTop: '10px' }}>
                        Life Stage
                      </Typography>
                      <hr></hr>
                    </>
                  )}

                  <Stack
                    direction="row"
                    sx={{
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}
                  >
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={filters.includes(option)}
                          onChange={(e) => handleChange(option, e)}
                        />
                      }
                      label={option}
                      style={{ display: 'block' }}
                    />
                    <Typography variant="body2">({showNum(option)})</Typography>
                  </Stack>
                </div>
              );
            })}
            <Stack direction="row" spacing={2} sx={{ mt: '10px' }}>
              <Button variant="outlined" onClick={() => resetFilters()}>
                Clear Filters
              </Button>
            </Stack>
          </Grid>
          <Grid item xs={8} sm={9} md={10}>
            <ProductsList products={searchedProducts} />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Products;
