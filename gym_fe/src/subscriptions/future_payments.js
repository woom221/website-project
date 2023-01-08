import { useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Grid from '@mui/material/Grid';
import image from '../background.jpg';
import Box from '@mui/material/Box';
import Nav from '../nav.js';
import Pagination from '@mui/material/Pagination';
import { CssBaseline, Typography } from '@mui/material';
import Footer from '../class/Footer/index.js';

function FuturePayments() {
  const [loading, setLoading] = useState(true)
  const [payments, setPayments] = useState([])
  const [page, setPage] = useState(1)
  const [pagin, setPagin] = useState(1)
  const [auth, setAuth] = useState(false)
  let isAuthenticated = false;
  if (localStorage.getItem('token')) {
    isAuthenticated = true;
  }

  useEffect(() => {
    if (localStorage.getItem('token')) {
      setAuth(true)
    }
  }, [])

  useEffect(() => {
    const fetchPayments = () => {
      return fetch('http://localhost:8000/subscriptions/upcoming-payments/?page=' + page, {
        headers: {
          'Authorization': "Token " + localStorage.getItem("token"),
        }
      })
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        const res = data["results"]
        const pages = Math.ceil(data["count"]/10)
        setPagin(pages)
        setPayments(res)
        setLoading(false);
      })
    }
    fetchPayments();
  }, [page,]);

  const columns = [
    { id: 'date_time', label: 'Date Paid', minWidth: 170, align: 'center' },
    { id: 'due_date', label: 'Date Due', minWidth: 170, align: 'center' },
    { id: 'amount', label: 'Amount', minWidth: 170, align: 'center' },
    { id: 'card_num', label: 'Card Number', minWidth: 170, align: 'center' }
  ];
  
  return (
    <Box sx={{height: '100vh'}}>
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <Nav isAuthenticated={isAuthenticated}/>
        <Box sx={{height: '100%',
          backgroundImage: `url(${image})`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          width: '100%',}}>
          <CssBaseline />
          {loading ? (<Typography align="center" component="h3" variant="h5">Fetching Payment History</Typography>) : (
            <Box>
            <Typography align="center" component="h1" variant="h3" color="secondary">Payment History</Typography>
            <Grid container>
            <Grid item xs={12}>
              <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="sticky table">
                  <TableHead>
                    <TableRow>
                      {columns.map((column) => (
                        <TableCell
                          key={column.id}
                          align={column.align}
                        >
                          {column.label}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {payments.map((pay) => {
                      return (
                        <TableRow hover role="checkbox" tabIndex={-1} key={pay.id}>
                          {columns.map((column) => {
                            const value = pay[column.id];
                            return (
                              <TableCell key={column.id} align={column.align}>
                                {value}
                              </TableCell>
                            );
                          })}
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          </Grid>
          </Box>)}
          <Pagination count={pagin} onChange={(e, page) => {setPage(page)}}/>
        </Box>
      </Paper>
      <Footer/>
    </Box>
  );
}

export default FuturePayments;
