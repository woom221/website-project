import { useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import img from '../login_img.jpg'
import Nav from '../nav.js';
import Footer from '../class/Footer/index.js';

function Login() {
  const navigate = useNavigate();
  const [logged, setLogged] = useState(true)

  const onSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData(e.currentTarget);
    const bodyParams = {
      username: data.get('username'),
      password: data.get('password')
    }
    try {
      fetch('http://localhost:8000/accounts/login/', {
        method: 'POST',
        body: JSON.stringify(bodyParams),
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((response) => response.json())
      .then((data) => {
        if (data.status !== 200) {
          setLogged(false)
          throw new Error(data.status);
        }
        else {
          console.log(data)
          localStorage.setItem("token", data.token);
          localStorage.setItem("userID", data.user_id);
          localStorage.setItem("username", data.username);
          navigate('/');
        }})

    } catch (err) {
      console.log('error');
    }
  }

  const toRegister = () => {
    navigate('/register')
  }

  return (
    <Box>
      <Nav isAuthenticated={false}/>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(${img})`,
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h4" color="secondary">
              Log in to your TFC Account
            </Typography>
            <Box component="form" noValidate onSubmit={onSubmit} sx={{ mt: 1 }}>
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
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Log In
              </Button>
              <Grid container>
                <Grid item>
                  <Typography>New here? <Button onClick={toRegister}>Sign Up!</Button></Typography>
                </Grid>
              </Grid>
              <Typography id="failed-login" color="primary.error">{logged ? '' : 'Invalid credentials'}</Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
      <Footer/>
    </Box>
  );
}

export default Login;
