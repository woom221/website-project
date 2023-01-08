import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import CameraIcon from '@mui/icons-material/PhotoCamera';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Nav from '../../nav.js';
import MainFeaturedPost from '../MainPost'
import SubscriptionCard from '../SubscriptionCard'
import AllClassesSearch from '../../class/filter_class_page.js'
import Footer from '../../class/Footer'
import image from '../../background.jpg'


const mainFeaturedPost = {
  title: 'Welcome to TFC',
  description:
    "We care for you. Having healthy body should be your priority. Connect with us and talk to us to have the best experience in your life!",
};


export default function HomePage() {

    let isAuthenticated = false;
      if (localStorage.getItem('token')) {
        isAuthenticated = true;
      }
  return (
    <Box sx={{height:'100vh'}}>
      <Nav isAuthenticated={isAuthenticated}/>
        <MainFeaturedPost post={mainFeaturedPost}/>
        <Box sx={{height: '100%',
      backgroundImage: `url(${image})`,
      backgroundRepeat: 'repeat',
      backgroundPosition: 'center',
      width: '100%',
      alignContent: 'center'
    }}>
        <SubscriptionCard />
        </Box>
    <Footer/>
  </Box>
  );
}
