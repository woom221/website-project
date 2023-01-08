import * as React from 'react';
import { Box, Paper, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import image from '../../background.jpg';

    
    function Copyright() {
        return (
          <Typography variant="body2" color="black" align="center">
            {'Copyright © '}
            <Link color="inherit" href="hello@google.com">
              TFC
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
          </Typography>
        );
      }
    
    
export default function Footer() {
    return(
        <Paper sx={{bottom: 0, width: '100%'}} square variant='outlined'>
        <Box sx={{ bgcolor: '#bbdefb', p: 2, paddingTop: 5}} component="footer">
        <Typography variant="h6" align="center" gutterBottom color="black">
        Interested in joining us at TFC? Contact us at:
        </Typography>
        <Typography
        variant="subtitle1"
        align="center"
        color="black"
        component="p"
        >
        torontofitness@gmail.com
        </Typography>
        <Copyright />
    </Box>
    </Paper>
    )
}