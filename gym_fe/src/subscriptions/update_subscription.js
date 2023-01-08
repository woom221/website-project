import { useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
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

const UpdateSubscription = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [err, setErr] = useState('')
  const [auth, setAuth] = useState(true)
  const [subs, setSubs] = useState([])
  const [loading, setLoading] = useState(true)
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
    if (!localStorage.getItem('token')) {
      setAuth(false);
    }
    if (loading) {
      fetchSubs();
    }
  }, [])

  const onSubscribe = (e) => {
    e.preventDefault();
    const id = e.target.value;
    const bodyParams = {
      subs_id: id
    }
    try {
      fetch('http://localhost:8000/subscriptions/update-subscription/', {
        method: 'PATCH',
        body: JSON.stringify(bodyParams),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Token ' + localStorage.getItem('token')
        },
      })
      .then((response) => {
        if (response.status >= 200 && response.status < 300) {
          setErr('Subscription Successful!')
          navigate('/my_subscription');
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
  return (
    <Box sx={{height: '100vh'}}>
      <Nav isAuthenticated={auth}/>
      <Box component="main" sx={{
            height: '100%',
            backgroundImage: `url(${image})`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            width: '100%',
          }}>
        <CssBaseline />
        <Container maxWidth="sm"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <EditIcon />
            </Avatar>
            <Typography component="h1" variant="h5" color="secondary" align="center">
              Choose A Subscription Plan
            </Typography>
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
                      <Button fullWidth variant="contained" value={sub.id} onClick={(e) => {onSubscribe(e, sub.id)}}>
                        Subscribe
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
              </Grid>
            </Container>
            <Typography component="body1" color="secondary" align="center">{err}</Typography>
        </Container>
      </Box>
      <Footer />
    </Box>
  );
}

export default UpdateSubscription;