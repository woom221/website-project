import { useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import EditIcon from '@mui/icons-material/Edit';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Nav from '../nav.js';
import image from '../background.jpg';
import Footer from '../class/Footer/index.js';

const EditPayment = () => {
  const navigate = useNavigate();
  const [err, setErr] = useState('')
  const [auth, setAuth] = useState(true)
  
  useEffect(() => {
    if (!localStorage.getItem('token')) {
      setAuth(false);
    }
  }, [])

  const onEdit = (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget)
    let bodyParams = {};
    if (data.get('payment_method') === ''){
      data.delete('payment_method')
    }
    if (data.get('card_num') === '') {
      data.delete('card_num')
    }
    
    try {
      fetch('http://localhost:8000/subscriptions/update-card/', {
        method: 'PATCH',
        body: data, //JSON.stringify(bodyParams),
        headers: {
          //'Content-Type': 'application/json',
          'Authorization': 'Token ' + localStorage.getItem('token')
        },
      })
      .then((response) => {
        if (response.status >= 200 && response.status < 300) {
          navigate('/past_payments');
        }
        else if (response.status >= 400) {
          response.json().then((data) => {
            console.log(data)
            setErr(data.detail)
            throw new Error(400);
          })
        }
      })
    } catch (err) {
      console.log('error');
    }
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
            
          </Avatar>
          <Typography component="h1" variant="h4" color="secondary">
            Edit Payment Info
          </Typography>
          <Box component="form" noValidate onSubmit={onEdit} sx={{ mt: 3 }}>
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
              Change
            </Button>
            <Typography id="failed-edit" color="primary">{err}</Typography>
          </Box>
        </Box>
        </Container>
      </Box>
      <Footer/>
    </Box>
  );
}

export default EditPayment;