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
import TextField from '@mui/material/TextField';
import { CssBaseline, Typography } from '@mui/material';
import Footer from '../class/Footer/index.js';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

function AllClassesSearch() {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [pagin, setPagin] = useState(1)
  const [filter, setFilter] = useState('')
  const [filVal, setFilVal] = useState('')
  const [classes, setClasses] = useState('')

  let isAuthenticated = false;
  if (localStorage.getItem('token')) {
    isAuthenticated = true;
  }

  const columns = [
    { id: 'name', label: 'Name', minWidth: 170, align: 'center' },
    { id: 'studio', label: 'Studio', minWidth: 170, align: 'center' },
    { id: 'time', label: 'Date & Time', minWidth: 170, align: 'center' }
  ];

  useEffect(() => {
    const fetchName = () => {
      fetch("http://localhost:8000/search_filter/class-filter-name/" + filVal +'/?page=' + page)
      .then((response) => response.json())
      .then((data) => {
        const res = data["results"]
        setClasses(res)
        const pages = Math.ceil(data["count"]/10)
        setPagin(pages)
        setLoading(false);
      })
    }

    const fetchCoach = () => {
      fetch("http://localhost:8000/search_filter/class-filter-coach/" +filVal +'/?page=' + page)
      .then((response) => response.json())
      .then((data) => {
        const res = data["results"]
        setClasses(res)
        const pages = Math.ceil(data["count"]/10)
        setPagin(pages)
        setLoading(false);
      })
    }

    const fetchDay = () => {
      fetch("http://localhost:8000/search_filter/class-filter-day/" + filVal +'/?page=' + page)
      .then((response) => response.json())
      .then((data) => {
        const res = data["results"]
        setClasses(res)
        const pages = Math.ceil(data["count"]/10)
        setPagin(pages)
        setLoading(false);
      })
    }

    const fetchHour = () => {
      fetch("http://localhost:8000/search_filter/class-filter-hour/" + filVal +'/?page=' + page)
      .then((response) => response.json())
      .then((data) => {
        const res = data["results"]
        setClasses(res)
        const pages = Math.ceil(data["count"]/10)
        setPagin(pages)
        setLoading(false);
      })
    }
    const fetchMonth = () => {
        fetch("http://localhost:8000/search_filter/class-filter-month/" + filVal +'/?page=' + page)
        .then((response) => response.json())
        .then((data) => {
          const res = data["results"]
          setClasses(res)
          const pages = Math.ceil(data["count"]/10)
          setPagin(pages)
          setLoading(false);
        })
      }
    const fetchYear = () => {
        fetch("http://localhost:8000/search_filter/class-filter-year/" + filVal +'/?page=' + page)
        .then((response) => response.json())
        .then((data) => {
            const res = data["results"]
            setClasses(res)
            const pages = Math.ceil(data["count"]/10)
            setPagin(pages)
            setLoading(false);
        })
    }

    if (filVal !== '') {
      console.log(page)
      if (filter === "class_name") {
        console.log('class name')
        fetchName();
      }
      if (filter ==="coach_name") {
        fetchCoach();
      }
      if (filter === "date") {
        fetchDay();
      }
      if (filter === "hour") {
        fetchHour();
      }
      if (filter === "month") {
        fetchMonth();
      }
      if (filter === "year") {
        fetchYear();
      }
    }

  }, [filVal, page])

  const handleFilterChange = (e) => {
    e.preventDefault()
    setFilter(e.target.value)
  }

  const handleValueChange = (e) => {
    e.preventDefault();
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
          <Box>
            <FormControl fullWidth>
              <InputLabel id="studio_filter_select">Filter By:</InputLabel>
              <Select
                value={filter}
                label="studio-filter"
                onChange={handleFilterChange}
              >
                <MenuItem value="class_name">Class Name</MenuItem>
                <MenuItem value="coach_name">Coach Name</MenuItem>
                <MenuItem value="hour">Hour</MenuItem>
                <MenuItem value="date">Date</MenuItem>
                <MenuItem value="month">Month</MenuItem>
                <MenuItem value="year">Year</MenuItem>
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
          {loading ? (<></>) : (
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
                {classes.map((cl) => {
                    return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={cl.id}>
                        {columns.map((column) => {
                        const value = cl[column.id];
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
            </TableContainer>)}
          </Box>
          <Pagination count={pagin} onChange={(e, page) => {setPage(page)}}/>
        </Box>
      <Footer/>
    </Box>
  );
}

export default AllClassesSearch;
