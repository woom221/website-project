import { useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import MapComponent from './map_component';
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

function AllStudios() {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(true)
  const [studios, setStudios] = useState([])
  const [markers, setMarkers] = useState([])
  const [page, setPage] = useState(1)
  const [pagin, setPagin] = useState(1)

  let isAuthenticated = false;
  if (localStorage.getItem('token')) {
    isAuthenticated = true;
  }

  useEffect(() => {
    const fetchDataNoOrigin = () => {
      return fetch("http://localhost:8000/studios/all-studios/?page=" + page)
      .then((response) => response.json())
      .then((data) => {
        const res = data["results"]
        const pages = Math.ceil(data["count"]/10)
        setPagin(pages)
        setStudios(res)
        let mkrs = []
        res.map((loc) => {
          const marker = [parseFloat(loc.longitude), parseFloat(loc.latitude)]
          mkrs.push(marker)
        })
        setMarkers(mkrs);
        setLoading(false);
      })
    }
    const fetchDataOrigin = () => {
      return fetch("http://localhost:8000/studios/all-studios?origin=" + location.state.origin + "&type=" + location.state.type + "&page=" + page)
      .then((response) => response.json())
      .then((data) => {
        const res = data["results"]
        const pages = Math.ceil(data["count"]/10)
        setPagin(pages)
        setStudios(res)
        let mkrs = []
        res.map((loc) => {
          const marker = [parseFloat(loc.longitude), parseFloat(loc.latitude)]
          mkrs.push(marker)
        })
        setMarkers(mkrs);
        setLoading(false);
      })}
    
    if (location && location.state && location.state.origin) {
      fetchDataOrigin();
    }
    else {
      fetchDataNoOrigin();
    }
  }, [page,]);

  const onClick = (e, studio) => {
    e.preventDefault()
    const id = studio.id
    const url = 'studio/' + id
    navigate(url, {state: {studioid: id}})
  }

  const columns = [
    { id: 'name', label: 'Name', minWidth: 170, align: 'center' },
    { id: 'address', label: 'Address', minWidth: 170, align: 'center' },
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
          {loading ? (<Typography align="center" component="h3" variant="h5">Fetching Studios</Typography>) : (
            <Grid container>
            <Grid item xs={6}>
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
                    {studios.map((studio) => {
                      return (
                        <TableRow hover role="checkbox" tabIndex={-1} key={studio.id} onClick={(e) => {onClick(e, studio)}}>
                          {columns.map((column) => {
                            const value = studio[column.id];
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
            <Grid item xs={6}>
              <MapComponent markers={markers}/>
            </Grid>
          </Grid>)}
          <Pagination count={pagin} onChange={(e, page) => {setPage(page)}}/>
        </Box>
      </Paper>
      <Footer/>
    </Box>
  );
}

export default AllStudios;
