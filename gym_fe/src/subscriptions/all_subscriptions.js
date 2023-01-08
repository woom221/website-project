import * as React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import StarIcon from '@mui/icons-material/StarBorder';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import GlobalStyles from '@mui/material/GlobalStyles';
import Container from '@mui/material/Container';
import Nav from '../nav.js';
import image from '../background.jpg';
import Footer from '../class/Footer/index.js';

const AllSubscriptions = () => {
  const navigate = useNavigate();
  const [subs, setSubs] = useState([])
  const [loading, setLoading] = useState(true)
  const [auth, setAuth] = useState(false)
  
  const onSubscribe = (e, sub) => {
    e.preventDefault()
    console.log(auth)
    if (auth === false) {
      navigate('/login');
    }
    else {
      navigate('/subscribe', {state: {subs_id: sub.id, sub_name: sub.name, sub_price: sub.price, sub_duration: sub.duration}});
    }
  }
  
  useEffect(() => {
    const fetchSubs = () => {
      return fetch("http://localhost:8000/subscriptions/all_subscriptions")
      .then((response) => response.json())
      .then((data) => {
        const res = data["results"]
        setSubs(res)
        setLoading(false);
      })
    }
    if (localStorage.getItem('token')) {
      setAuth(true);
    }
    if (loading) {
      fetchSubs();
    }
  }, [])

  return (
    <React.Fragment>
    <Box sx={{height: '100vh'}}>
      <GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }} />
      <Nav isAuthenticated={auth}/>
      <CssBaseline />
      <Box component="main" sx={{
            height: '100%',
            backgroundImage: `url(${image})`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            width: '100%',
          }}>
      <Container disableGutters maxWidth="sm" component="main" sx={{ pt: 8, pb: 6 }}>
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="primary"
          gutterBottom
        >
          Subscriptions
        </Typography>
        <Typography variant="h5" align="center" color="secondary" component="p">
          Choose from any of our subscription plans, all of which are cancelable at any time! 
        </Typography>
      </Container>
      <Container maxWidth="md" component="main">
        <Grid container spacing={5} alignItems="flex-end">
          {subs.map((sub) => (
            <Grid
              item
              key={sub.name}
              xs={12}
              sm={6}
              md={4}
            >
              <Card>
                <CardHeader
                  title={sub.name}
                  titleTypographyProps={{ align: 'center' }}
                />
                <CardContent>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'baseline',
                      mb: 2,
                    }}
                  >
                    <Typography component="h2" variant="h3" color="primary">
                      ${sub.price}
                    </Typography>
                    {sub.duration === 'M' ? (
                    <Typography variant="h6" color="secondary">
                      /mo
                    </Typography>) : (
                    <Typography variant="h6" color="secondary">
                      /y
                    </Typography>
                    )}
                  </Box>
                </CardContent>
                <CardActions>
                  <Button fullWidth variant="contained" onClick={(e) => {onSubscribe(e, sub)}}>
                    Subscribe
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
      </Box>
      <Footer/>
      </Box>
    </React.Fragment>
  );
}

export default AllSubscriptions;