import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Nav from '../nav.js';
import image from '../background.jpg';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Footer from '../class/Footer/index.js';

function Register() {
  const navigate = useNavigate();

  const [un_err, setUnErr] = useState('')
  const [pw_err, setPwErr] = useState('')
  const [pw2_err, setPw2Err] = useState('')
  const [email_err, setEmailErr] = useState('')
  const [ph_err, setPhErr] = useState('')
  const [fn_err, setFnErr] = useState('')
  const [ln_err, setLnErr] = useState('')

  const onSubmit = async (e) => {
    e.preventDefault();

    let data = new FormData(e.currentTarget);
    
    if (data.get('avatar') === null || data.get('avatar').name === '') {
      data.delete('avatar')
    }

    /*const data = new FormData(e.currentTarget);
    let bodyParams = {
      username: data.get('username'),
      password: data.get('password'),
      password2: data.get('password2'),
      first_name: data.get('first_name'),
      last_name: data.get('last_name'),
      email: data.get('email'),
      phone_num: data.get('phone_num'),
    }
    if (data.get('avatar') !== null || data.get('avatar').name !== '') {
      bodyParams['avatar'] = data.get('avatar')
    }*/
    
    try {
      fetch('http://localhost:8000/accounts/register/', {
        method: 'POST',
        body: data, //JSON.stringify(bodyParams),
        /*headers: {
          'Content-Type': 'application/json',
        }*/
      })
      .then((response) => {
        if (response.status >= 200 && response.status < 300) {
          navigate('/login');
        }
        else if (response.status >= 400) {
          response.json().then((data) => {
            console.log(data)
            setUnErr('')
            setPwErr('')
            setPw2Err('')
            setFnErr('')
            setLnErr('')
            setEmailErr('')
            setPhErr('')
            if (data.username) {
              setUnErr(data.username[0])
            }
            if (data.password) {
              setPwErr(data.password[0])
            }
            if (data.password2) {
              setPw2Err(data.password2[0])
            }
            if (data.first_name) {
              setFnErr(data.first_name[0])
            }
            if (data.last_name) {
              setLnErr(data.last_name[0])
            }
            if (data.email) {
              setEmailErr(data.email[0])
            }
            if (data.phone_num) {
              setPhErr(data.phone_num[0])
            }
            throw new Error(data.status);
          })  
        }
      })
    } catch (err) {
      console.log('error');
    }
  }

  const toLogin = () => {
    navigate('/login')
  }

  return (
    <Box sx={{height: '100vh'}}>
      <CssBaseline />
      <Nav isAuthenticated={false}/>
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
            Create Your Account
          </Typography>
          <Box component="form" noValidate onSubmit={onSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
                  autoComplete="username"
                  autoFocus
                />
                <Typography id="un-err">{un_err}</Typography>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
                <Typography id="pw-err">{pw_err}</Typography>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password2"
                  label="Retype Password"
                  type="password"
                  id="password2"
                  autoComplete="password2"
                />
                <Typography id="pw2-err">{pw2_err}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="first_name"
                  required
                  fullWidth
                  id="first_name"
                  label="First Name"
                  autoFocus
                />
                <Typography id="first_name-err">{fn_err}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="last_name"
                  label="Last Name"
                  name="last_name"
                  autoComplete="family-name"
                />
                <Typography id="last_name-err">{ln_err}</Typography>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
                <Typography id="email-err">{email_err}</Typography>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="phone_num"
                  label="Phone Number"
                  name="phone_num"
                />
                <Typography id="ph-err">{ph_err}</Typography>
              </Grid>
              <Grid>
                <TextField
                  name="avatar"
                  fullWidth
                  id="avatar"
                  label="Avatar"
                  type="file"
                  accept="image/png, image/jpeg"
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
                <Typography>Already have an account? <Button onClick={toLogin}>Log In</Button></Typography>
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

export default Register;