import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import WeekTable from '../WeekTable';
import Nav from '../../nav';
import image from '../../background.jpg';
import Footer from '../Footer';
import { useLocation } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
 
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 10 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
  };
}

export default function BasicTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  let isAuthenticated = false;
  if (localStorage.getItem('token')) {
    isAuthenticated = true;
  }

  const location = useLocation();

  return (
    <Box sx={{height: '100vh'}}>
      <CssBaseline />
      <Nav isAuthenticated={ isAuthenticated }/>
      <Box sx={{height: '100%',
        backgroundImage: `url(${image})`,
        backgroundRepeat: 'repeat',
        backgroundPosition: 'center',
        width: '100%',
        alignContent: 'center',
        mb: 5,
      }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} textColor="primary" indicatorColor="secondary" centered>
            <Tab label="Upcoming Classes" {...a11yProps(0)} />
            <Tab label="Every Class Offered" {...a11yProps(1)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <Box sx={{ marginLeft: '20%' }}>
          <WeekTable key={2} offset={0} studio_val={ location.state.studio_val }/>
          </Box>
        </TabPanel>
        <TabPanel value={value} index={1}>
        <Box sx={{ marginLeft: '20%' }}>
          <WeekTable key={3} offset={1} studio_val={ location.state.studio_val }/>
          </Box>
        </TabPanel>
    </Box>
    <Footer/>
  </Box>
  );
}
