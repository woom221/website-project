import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Nav from '../nav.js';
import image from '../background.jpg';
import Footer from '../class/Footer/index.js';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';

function MySubscription() {
  const navigate = useNavigate();
  const [subscription, setSubscription] = useState([])
  const [loading, setLoading] = useState(true)
  const [auth, setAuth] = useState(false)
  const [err, setErr] = useState('')
  
  useEffect(() => {
    const fetchMySubscription = () => {
      return fetch("http://localhost:8000/subscriptions/my_subscription", {
        headers: {
          'Authorization': "Token " + localStorage.getItem("token"),
        }
      })
      .then((response) => response.json())
      .then((data) => {
        setSubscription(data);
        setLoading(false);
      })
    }
    if (localStorage.getItem('token')) {
      setAuth(true);
    }
    if (loading) {
      fetchMySubscription();
    }
    
  }, []);

  const toCancel = (e) => {
    e.preventDefault();
    const bodyParams = {
      active: false
    }
    try {
      fetch('http://localhost:8000/subscriptions/cancel-subscription/', {
        method: 'PATCH',
        body: JSON.stringify(bodyParams),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Token ' + localStorage.getItem('token')
        },
      })
      .then((response) => {
        if (response.status >= 200 && response.status < 300) {
          navigate('/all_subscriptions');
        }
        else if (response.status >= 400) {
          response.json().then((data) => {
            setErr(data.detail)
            throw new Error(400);
          })
        }
      })
    } catch (err) {
      console.log('error');
    }
  }

  const toUpdate = (e) => {
    e.preventDefault();
    navigate('/update_subscription')
  }

  const toEdit = (e) => {
    e.preventDefault();
    navigate('/edit_payment')
  }

  const toPastPayments = (e) => {
    e.preventDefault();
    navigate('/past_payments')
  }
  
  const toFuturePayments = (e) => {
    e.preventDefault();
    navigate('/future_payments')
  }
  return (
    <Box sx={{height: '100vh'}}>
      <Nav isAuthenticated={auth}/>
      <Box sx={{paddingTop:'5%',
            height: '100%',
            backgroundImage: `url(${image})`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            width: '100%',}}>
        <CssBaseline />
        <Container>
          <Card sx={{ minWidth: 345 }}>
            <CardContent>
              <Typography align="center" variant="h2" color="primary">
                Current Plan: {subscription.subs_name}
              </Typography>
              <Typography align="center" variant="h5" color="secondary">
                Price: ${subscription.subs_price}
              </Typography>
              <Typography align="center" variant="h5" color="secondary">
                Duration: {subscription.subs_duration}
              </Typography>
                <Grid container>
                  <Grid item xs={12} sm={4} align="center">
                    <Button onClick={(e) => {toCancel(e)}} variant="contained" sx={{ mt: 3, mb: 2 }}>Cancel Subscription</Button>
                    <Typography color="secondary" align="center">{err}</Typography>
                  </Grid>
                  <Grid item xs={12} sm={4} align="center">
                    <Button onClick={(e) => {toUpdate(e)}} variant="contained" sx={{ mt: 3, mb: 2 }}>Change Subscription</Button>
                  </Grid>
                  <Grid item xs={12} sm={4} align="center">
                    <Button onClick={(e) => {toEdit(e)}} variant="contained" sx={{ mt: 3, mb: 2 }}>Edit Payment</Button>
                  </Grid>
                  <Grid item xs={12} sm={6} align="center">
                    <Button onClick={(e) => {toPastPayments(e)}} variant="contained" sx={{ mt: 3, mb: 2 }}>Past Payments</Button>
                  </Grid>
                  <Grid item xs={12} sm={6} align="center">
                    <Button onClick={(e) => {toFuturePayments(e)}} variant="contained" sx={{ mt: 3, mb: 2 }}>Upcoming Payments</Button>
                  </Grid>
                </Grid>
            </CardContent>
          </Card>
        </Container>
      </Box>
      <Footer/>
    </Box>
  );
}

export default MySubscription;
