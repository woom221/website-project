import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Nav from '../nav.js';
import image from '../background.jpg';
import Footer from '../class/Footer/index.js';

function FindStudio() {
  const navigate = useNavigate();
  const [postalCode, setPostalCode] = useState("")
  const [auth, setAuth] = useState(false)

  useEffect(() => {
    if (localStorage.getItem('token')) {
      setAuth(true);
    }
  }, [])

  let isAuthenticated;
  if (localStorage.getItem('token')) {
    isAuthenticated = true;
  }
  else {
    isAuthenticated = false;
  }

  const onSubmitPC = (e) => {
    e.preventDefault()
    // navigate to all_studios (studios_page) with postal code origin and type
    navigate('/all_studios', {state: {origin: postalCode, type:'pc'}})
  }

  const onSubmitCurrLoc = (e) => {
    e.preventDefault()
    navigator.geolocation.getCurrentPosition(function(position) {
      const lat = position.coords.latitude
      const lon = position.coords.longitude
      const latlon = lon + ', ' + lat
      // navigate to all_studios (studios_page) with lat lon info
      navigate('/all_studios', {state: {origin: latlon, type:'currloc'}})
    });
  }

  const onSubmitMap = (e) => {
    e.preventDefault()
    navigate('/add_pin') // goes to map_clickable
  }

  const onSearch = (e) => {
    e.preventDefault()
    navigate('/all_studios_search')
  }

  const onSearchClasses = (e) => {
    e.preventDefault()
    navigate('/all_classes_search')
  }

  return (
    <Box>
      <Nav isAuthenticated={auth}/>
      <Box sx={{height: '100vh',
        backgroundImage: `url(${image})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        width: '100%',}}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <ManageSearchIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Search for a Studio
          </Typography>
          <Box sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Button
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  onClick={(e) => onSubmitCurrLoc(e)}
                >
                  Use Current Location
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Button
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  onClick={(e) => onSubmitMap(e)}
                >
                  Add Pin on Map
                </Button>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="postal_code"
                  label="Postal Code"
                  name="postal_code"
                />
                <Button
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  onClick={(e) => onSubmitPC(e)}
                >
                  Use Postal Code
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Button
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  onClick={(e) => onSearch(e)}
                >
                  Search using Filters
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Button
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  onClick={(e) => onSearchClasses(e)}
                >
                  Search Classes using Filters
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
      </Box>
      <Footer/>
    </Box>
  );
}

export default FindStudio;
