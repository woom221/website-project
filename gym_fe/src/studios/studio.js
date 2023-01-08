import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import * as React from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import image from '../background.jpg';
import Nav from '../nav.js';
import { CssBaseline, Paper } from '@mui/material';
import Footer from '../class/Footer/index.js';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

function Studio() {
  const { id } = useParams();

  const [loading, setLoading] = useState(true)
  const [studio, setStudio] = useState("")

  let isAuthenticated = false;
  if (localStorage.getItem('token')) {
    isAuthenticated = true;
  }

  useEffect(() => {
    const fetchData = () => {
      return fetch('http://localhost:8000/studios/studio/' + id)
      .then((response) => response.json())
      .then((data) => {
        setStudio(data);
        setLoading(false);
      });
    }

    if (loading) {
      fetchData();
    }
  }, []);



    const navigate = useNavigate();

    const toClassTab=()=>{
      navigate('/view_class', {state:{studio_val: id}});
    }

  return (
    <Box sx={{height: '100vh'}}>
      <Nav isAuthenticated={isAuthenticated}/>
      <Box sx={{paddingTop:'5%',
            height: '100%',
            backgroundImage: `url(${image})`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            width: '100%',
            overflow: 'hidden',
            mb: 5}}>
        <CssBaseline />
        <Container>
          <Card sx={{ minWidth: 345}}>
            <Paper style={{height: 300, overflow:'auto'}}>
              <Stack direction="row" spacing={2}>
                {studio.images ? (studio.images.map((img) => {
                  return <Item><img src={img.image} height={250}/></Item>
                })) : (<Typography>No images to display</Typography>)}
              </Stack>
            </Paper>
            <CardContent>
              <Typography align="center" variant="body1" color="text.secondary">
                Studio Name: {studio.name}
              </Typography>
              <Typography align="center" variant="body1" color="text.secondary">
                Address: {studio.address}
              </Typography>
              <Typography align="center" variant="body1" color="text.secondary">
                Phone Number: {studio.phone_num}
              </Typography>
              {studio.amenities ? studio.amenities.map(function(am){
                return (
                  <Grid>
                    <Grid item>
                      <Typography align="center" variant="body1" color="text.secondary">
                        {am.name}: {am.quantity}
                      </Typography>
                    </Grid>
                  </Grid>
                )}) : <></>}
                <Grid container>
                  <Grid item xs={12} sm={6} align="center">
                    <Link href={"https://www.google.com/maps/search/?api=1&query=" + studio.latitude + ', ' + studio.longitude}><Button variant="contained" sx={{ mt: 3, mb: 2 }}>Directions</Button></Link>
                  </Grid>
                  <Grid item xs={12} sm={6} align="center">
                    <Button onClick={() => {toClassTab()}} variant="contained" sx={{ mt: 3, mb: 2 }}>Classes</Button>
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

export default Studio;
