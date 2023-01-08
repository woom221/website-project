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

function ViewProfile() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState([])
  const [loading, setLoading] = useState(true)
  const [auth, setAuth] = useState(false)

  useEffect(() => {
    const fetchProfile = () => {
      return fetch("http://localhost:8000/accounts/edit-profile", {
        headers: {
          'Authorization': "Token " + localStorage.getItem("token"),
        }
      })
      .then((response) => response.json())
      .then((data) => {
        setProfile(data);
        setLoading(false);
      })
    }
    if (localStorage.getItem('token')) {
      setAuth(true);
    }
    if (loading) {
      fetchProfile();
    }
    
  }, []);

  const toEdit = () => {
    navigate('/edit_profile', {state: {first_name: profile.first_name, last_name: profile.last_name, email: profile.email, phone_num: profile.phone_num, avatar: profile.avatar}});
  }

  return (
    <Box sx={{height: '100vh'}}>
      <Nav isAuthenticated={true}/>
      <Box component="main" sx={{
            height: '100%',
            backgroundImage: `url(${image})`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            width: '100%',
          }}>
        <Container
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        > 
          <CssBaseline />
          {auth ? (
          <Container sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}>
          <Avatar src={profile.avatar} sx={{width: 200, height: 200, m:2}}/>
          <Typography component="h1" variant="h5" color="secondary">Your Profile</Typography>
          <Box sx={{ mt: 3 }}>
            <Grid container>
              <Grid item sm={12}>
                <Typography align="center">Username: {profile.username}</Typography>
              </Grid>
              <Grid item sm={12}>
                <Typography align="center">First Name: {profile.first_name}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography align="center">Last Name: {profile.last_name}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography align="center">Email: {profile.email}</Typography>
              </Grid>
              <Grid item sm={12}>
                <Typography align="center">Phone Number: {profile.phone_num}</Typography>
              </Grid>
              <Grid item xs={12} >
                <Button
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                align="center"
                onClick={toEdit}>Edit Profile</Button>
              </Grid>
            </Grid>
          </Box>
          </Container>) : (
          <Box>
            <Typography justifyContent="center" align="center" component="h1" variant="h3">Not Authorized</Typography>
            <Typography justifyContent="center" align="center" component="h3" variant="h5">Seems like you're not logged in!</Typography>
          </Box>)}
        </Container>
      </Box>
      <Footer/>
    </Box>
  );
}

export default ViewProfile;
