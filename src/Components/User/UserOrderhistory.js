import * as React from 'react';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { loginWithToken } from '../../store';
import { styled } from '@mui/material/styles';
import Link from '@mui/material/Link';
import Container from '@mui/material/Container';
import Table from '@mui/material/Table';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
const dayjs = require('dayjs');

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const UserOrderhistory = () => {
  const { auth, orders } = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // console.log(orders)

  useEffect(() => {
    dispatch(loginWithToken());
  }, []);

  return (
    <Container maxWidth="lg" sx={{ alignItems: 'center' }}>
      <Stack
        spacing={2}
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          alignContent: 'center',
          p: 1,
        }}
      >
        <Typography variant="h2" gutterBottom>
          Welcome {auth.username} !!
        </Typography>
        <Typography variant="h5" gutterBottom>
          Orders
        </Typography>
        {!orders.length ? (
          <Typography variant="h6" style={{ marginBottom: '10' }}>
            You haven't placed an order yet
          </Typography>
        ) : (
          <TableContainer component={Paper}>
            <Table aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell
                    align="center"
                    style={{ minWidth: 50, backgroundColor: '#0081c3' }}
                  >
                    Order #{' '}
                  </StyledTableCell>
                  <StyledTableCell
                    align="center"
                    style={{ minWidth: 100, backgroundColor: '#0081c3' }}
                  >
                    Purchased On
                  </StyledTableCell>
                  <StyledTableCell
                    align="center"
                    style={{ minWidth: 150, backgroundColor: '#0081c3' }}
                  >
                    Product
                  </StyledTableCell>
                  <StyledTableCell
                    v
                    style={{ minWidth: 50, backgroundColor: '#0081c3' }}
                  >
                    Quantity
                  </StyledTableCell>
                  <StyledTableCell
                    align="center"
                    style={{ minWidth: 100, backgroundColor: '#0081c3' }}
                  >
                    Order Total&nbsp;($)
                  </StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orders.map((order) => (
                  <StyledTableRow key={order.id}>
                    <StyledTableCell
                      component="th"
                      scope="row"
                      align="center"
                      style={{ minWidth: 50 }}
                    >
                      {`0000${order.id.slice(0, 4)}`}
                    </StyledTableCell>
                    <StyledTableCell align="center" style={{ minWidth: 100 }}>
                      {dayjs(order.createdAt).format('YYYY/MM/DD hh:mm A')}
                    </StyledTableCell>
                    <StyledTableCell align="left" style={{ minWidth: 150 }}>
                      {order.lineItems.map((lineitem) => {
                        return (
                          <Grid style={{ marginBottom: '5' }}>
                            <Link
                              component={RouterLink}
                              to={`/products/${lineitem.product.id}`}
                            >
                              {`${lineitem.product.name.slice(0, 80)}...`}
                            </Link>
                          </Grid>
                        );
                      })}
                    </StyledTableCell>
                    <StyledTableCell align="center" style={{ minWidth: 50 }}>
                      {order.lineItems.map((lineitem) => {
                        return (
                          <Grid>
                            <Typography>{lineitem.quantity}</Typography>
                          </Grid>
                        );
                      })}
                    </StyledTableCell>
                    <StyledTableCell align="center" style={{ minWidth: 100 }}>
                      <Typography>
                        {parseFloat(order.orderTotal).toFixed(2)}
                      </Typography>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
        <Button
          variant="outlined"
          color="primary"
          sx={{ my: 2 }}
          onClick={() => navigate('/products')}
        >
          Continue Shopping
        </Button>
      </Stack>
    </Container>
  );
};

export default UserOrderhistory;
