import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import StarIcon from '@mui/icons-material/StarBorder';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import GlobalStyles from '@mui/material/GlobalStyles';
import Container from '@mui/material/Container';


const tiers = [
  {
    title: 'Subscribe',
    description: [
      'Subscribe to access',
      'our newest facilities.',
      'Find the best deals',
      'that we offer!',
    ],
    buttonText: 'Subscribe now!',
    buttonVariant: 'contained',
    link: '/all_subscriptions/',
  },
  {
    title: 'Studio',
    description: [
      'Find studios located',
      'nearest to you.',
      'Join numerous classes',
      'with best amenities!',
    ],
    buttonText: 'Find nearest studio',
    buttonVariant: 'contained',
    link:'/find_studio',
  },
  {
    title: 'Search',
    description: [
      'Search for classes',
      'offered by famous coaches.',
      'Find out what classes',
      'are being offered now!',
    ],
    buttonText: 'Search now',
    buttonVariant: 'contained',
    link:'/all_classes_search',
  },
];


function Content() {
  return (
    <React.Fragment>
      <GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }} />
      <CssBaseline />

      <Container disableGutters component="main" sx={{ pt: 8, pb: 6}}>
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="text.primary"
          gutterBottom
        >
          See what we offer!
        </Typography>
        <Typography variant="h5" align="center" color="text.secondary" component="p">
          Please check out our special subscription plans to find out the deals we have.
          </Typography>
          <Typography variant="h5" align="center" color="text.secondary" component="p">
          Find the nearest studio to see what classes we offer.
          </Typography>
          <Typography variant="h5" align="center" color="text.secondary" component="p">
          Search for amazing classes offered by your favourite coaches!
          </Typography>
      </Container>
      {/* End hero unit */}
      <Container maxWidth="md" component="main" sx={{mb: 10}}>
        <Grid container spacing={5} alignItems="flex-end">
          {tiers.map((tier) => (
            // Enterprise card is full width at sm breakpoint
            <Grid
              item
              key={tier.title}
              xs={12}
              sm={tier.title === 'Enterprise' ? 12 : 6}
              md={4}
            >
              <Card>
                <CardHeader
                  title={tier.title}
                  subheader={tier.subheader}
                  titleTypographyProps={{ align: 'center' }}
                  subheaderTypographyProps={{
                    align: 'center',
                  }}
                  sx={{
                    backgroundColor: (theme) =>
                      theme.palette.mode === 'light'
                        ? theme.palette.grey[200]
                        : theme.palette.grey[700],
                  }}
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
                  </Box>
                  <ul>
                    {tier.description.map((line) => (
                      <Typography
                        component="li"
                        variant="subtitle1"
                        align="center"
                        key={line}
                      >
                        {line}
                      </Typography>
                    ))}
                  </ul>
                </CardContent>
                <CardActions>
                  <Button href={tier.link} fullWidth variant={tier.buttonVariant}>
                    {tier.buttonText}
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </React.Fragment>
  );
}

export default function SubscriptionCard() {
  return <Content />;
}