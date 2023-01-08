import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import MyClass from '../MyClass';
import Nav from '../../nav';
import MyFutureClass from '../MyFutureClass';
import image from '../../background.jpg'
import Footer from '../Footer';
import CssBaseline from '@mui/material/CssBaseline';

function MyClassTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

MyClassTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function myClassa11yProps(index) {
    return {
      id: `simple-tab-${index}`,
    };
  }



  export default function MyClassTab() {
      const [value, setValue] = React.useState(0);

      const handleChange = (event, newValue) => {
            setValue(newValue);
      };

      let isAuthenticated = false;
      if (localStorage.getItem('token')) {
        isAuthenticated = true;
      }
      else {
        window.location.href = '/login'
      }

    return (
    <Box sx={{height: '100vh'}}>
      <CssBaseline />
      <Nav isAuthenticated={isAuthenticated}/>
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
              <Tab label="Upcoming enrolled Classes" {...myClassa11yProps(0)} />
              <Tab label="Past Classes" {...myClassa11yProps(1)} />
            </Tabs>
          </Box>
          <MyClassTabPanel value={value} index={0}>
          <Box sx={{ marginLeft: '20%' }}>
            <MyFutureClass key={0} type_val={'FUTURE'}/>
            </Box>
          </MyClassTabPanel>
          <MyClassTabPanel value={value} index={1}>
          <Box sx={{ marginLeft: '20%' }}>
            <MyClass key={1} type_val={'PAST'}/>
            </Box>
          </MyClassTabPanel>
        </Box>
        <Footer/>
      </Box>
    );
  }
