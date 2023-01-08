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

function EditProfile() {
  const navigate = useNavigate();
  const location = useLocation();
  const [email_err, setEmailErr] = useState('')
  const [ph_err, setPhErr] = useState('')
  const [fn_err, setFnErr] = useState('')
  const [ln_err, setLnErr] = useState('')
  const [img, setImg] = useState(null)
  const [auth, setAuth] = useState(true)

  useEffect(() => {
    if (localStorage.getItem('token')) {
      setAuth(true);
    }
  }, [])

  const onSubmit = async (e) => {
    e.preventDefault();
    let data = new FormData(e.currentTarget);
    let bodyParams = {
      first_name: data.get('first_name'),
      last_name: data.get('last_name'),
      email: data.get('email'),
      phone_num: data.get('phone_num'),
    }
    if (data.get('avatar') === null || data.get('avatar').name === '') {
      data.delete('avatar')
      bodyParams['avatar'] = data.get('avatar')
    }
    try {
      fetch('http://localhost:8000/accounts/edit-profile/', {
        method: 'PATCH',
        body: data, //JSON.stringify(bodyParams),
        headers: {
          //'Content-Type': 'multipart/form-data',
          'Authorization': "Token " + localStorage.getItem("token"),
        },
      })
      .then((response) => response.json())
      .then((data) => {
        if (data.status >= 400) {
          setFnErr('')
          setLnErr('')
          setEmailErr('')
          setPhErr('')
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
        }
        else {
          navigate('/view_profile')
        }})

    } catch (err) {
      console.log('error');
    }
  }

  const getImg = (e) => {
    setImg(e.target.files[0])
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
        <CssBaseline />
        <Container
          maxWidth="sm"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          {auth ? (
          <Container sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}>
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <EditIcon />
          </Avatar>
          <Typography component="h1" variant="h5" color="secondary" align="center">
            Edit Profile
          </Typography>
          <Box component="form" noValidate onSubmit={onSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="first_name"
                  required
                  fullWidth
                  id="first_name"
                  label="First Name"
                  defaultValue={location.state.first_name}
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
                  defaultValue={location.state.last_name}
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
                  defaultValue={location.state.email}
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
                  defaultValue={location.state.phone_num}
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
                  onChange={getImg}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Save
            </Button>
          </Box>
          </Container> ) : (
          <Box>
            <Typography justifyContent="center" align="center" component="h1" variant="h3" color="primary">Not Authorized</Typography>
            <Typography justifyContent="center" align="center" component="h3" variant="h5" color="primary">Seems like you're not logged in!</Typography>
          </Box>)}
        </Container>
      </Box>
      <Footer />
    </Box>
  );
}

export default EditProfile;