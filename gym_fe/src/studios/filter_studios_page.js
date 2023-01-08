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
import TextField from '@mui/material/TextField';
import { CssBaseline, Typography } from '@mui/material';
import Footer from '../class/Footer/index.js';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Link from '@mui/material/Link';

function AllStudiosSearch( {onClick} ) {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(true)
  const [studios, setStudios] = useState([])
  const [markers, setMarkers] = useState([])
  const [page, setPage] = useState(1)
  const [pagin, setPagin] = useState(1)
  const [filter, setFilter] = useState('')
  const [filVal, setFilVal] = useState('')

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
    if (loading) {
      fetchDataNoOrigin();
    }
  }, [page,]);

  const columns = [
    { id: 'name', label: 'Name', minWidth: 170, align: 'center' },
    { id: 'address', label: 'Address', minWidth: 170, align: 'center' },
  ];

  useEffect(() => {
    const fetchName = () => {
      fetch("http://localhost:8000/search_filter/studio-filter-name/" + filVal +'/?page=' + page)
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

    const fetchCoach = () => {
      fetch("http://localhost:8000/search_filter/studio-filter-coach/" + filVal +'/?page=' + page)
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

    const fetchClass = () => {
      fetch("http://localhost:8000/search_filter/studio-filter-class/" + filVal +'/?page=' + page)
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

    const fetchAmenities = () => {
      fetch("http://localhost:8000/search_filter/studio-filter-amenities/" + filVal +'/?page=' + page)
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

    if (filVal !== '') {
      if (filter == "studio_name") {
        fetchName();
      }
      if (filter == "coach_name") {
        fetchCoach();
      }
      if (filter == "class_name") {
        fetchClass();
      }
      if (filter == "amenity") {
        fetchAmenities();
      }
    }

  }, [filVal, page])

  const handleFilterChange = (e) => {
    setFilter(e.target.value)
  }

  const handleValueChange = (e) => {
    const data = new FormData(e.currentTarget);
    const fil_val = data.get('fil_val');
    setLoading(true)
    setFilVal(fil_val)
  }
  return (
    <Box sx={{height: '100vh'}}>
        <Nav isAuthenticated={isAuthenticated}/>
        <Box sx={{height: '100%',
          backgroundImage: `url(${image})`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          width: '100%',
          p: 2}}>
          <CssBaseline />
          {loading ? (<Typography align="center" component="h3" variant="h5">Fetching Studios</Typography>) : (
          <Box>
            <FormControl fullWidth>
              <InputLabel id="studio_filter_select">Filter By:</InputLabel>
              <Select
                value={filter}
                label="studio-filter"
                onChange={handleFilterChange}
              >
                <MenuItem value="studio_name">Studio Name</MenuItem>
                <MenuItem value="coach_name">Coach Name</MenuItem>
                <MenuItem value="class_name">Class Name</MenuItem>
                <MenuItem value="amenity">Amenity</MenuItem>
              </Select>
            </FormControl>
            <Box component="form" onSubmit={handleValueChange}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="fil_val"
                label="Filter Value"
                name="fil_val"
                autoFocus
              />
            </Box>
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
                        <TableRow hover role="checkbox" tabIndex={-1} key={studio.id}>
                          {columns.map((column) => {
                            const value = studio[column.id];
                            if (column.id == 'name') {
                              return <TableCell key={column.id} align={column.align}>
                                  <Link href={"http://localhost:3000/all_studios/studio/" + studio.id}>{value}</Link>
                              </TableCell>
                            }
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
          </Grid>
          </Box>)}
          <Pagination count={pagin} onChange={(e, page) => {setPage(page)}}/>
        </Box>
      <Footer/>
    </Box>
  );
}

export default AllStudiosSearch;
