import * as React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import image from '../background.jpg';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Nav from '../nav.js';
import Container from '@mui/material/Container';
import Footer from '../class/Footer/index.js';

const Subscribe = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [subs, setSubs] = useState([])
  const [loading, setLoading] = useState(true)
  const [auth, setAuth] = useState(true)
  const [fail, setFail] = useState(false)
  const [err, setErr] = useState('')
  useEffect(() => {
    if (!localStorage.getItem('token')) {
      setAuth(false)
    };
  }, [])

  const onSubscribe = (e) => {
    e.preventDefault()
    let data = new FormData(e.currentTarget);
    const bodyParams = {
      username: localStorage.getItem('username'),
      subs_id: location.state.subs_id,
      subs_name: location.state.sub_name,
      subs_price: location.state.sub_price,
      subs_duration: location.state.sub_duration,
      payment_method: data.get('payment_method'),
      card_num: data.get('card_num'),
      active: true
    }
    try {
      fetch('http://localhost:8000/subscriptions/subscribe/', {
        method: 'POST',
        body: JSON.stringify(bodyParams),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Token ' + localStorage.getItem('token')
        },
      })
      .then(function(response) {
            if (response.status >= 200 && response.status < 300) {
                navigate('/my_subscription');
        }
            else {
                {setErr("Unsuccessful: Your card format may be invalid (ex. 1234567812345678) or You may be already subscribed");
          }
        }
      })
    } catch (err) {
      console.log('error');
    }
  }
  const toUpdate = (e) => {
    navigate('/update_subscription')
  }

  return (
    <Box sx={{height: '100vh'}}>
      <CssBaseline />
      <Nav isAuthenticated={auth}/>
      <Box sx={{height: '100%',
            backgroundImage: `url(${image})`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            width: '100%',
          }}>
        <Container maxWidth="sm">
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h4" color="secondary">
            Subscribe
          </Typography>
          <Box component="form" noValidate onSubmit={onSubscribe} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="payment_method"
                  label="Payment Method"
                  name="payment_method"
                  autoComplete="payment_method"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="card_num"
                  label="Card Number"
                  type="card_num"
                  id="card_num"
                  autoComplete="card_num"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Register
            </Button>
            <Grid container>
              <Grid item>
                <Typography>Already Subscribed? <Button onClick={toUpdate}>Update Subscription</Button></Typography>
              </Grid>
            </Grid>
            <Typography id="failed-subs" color="primary">{err}</Typography>
          </Box>
        </Box>
        </Container>
      </Box>
      <Footer/>
    </Box>
  );
}

export default Subscribe;