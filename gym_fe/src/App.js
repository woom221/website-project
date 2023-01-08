import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import Login from './accounts/login'
import Register from './accounts/register'
import Map from './studios/map_component'
import FindStudio from './studios/find_studios';
import AllStudios from './studios/studios_page';
import MapClickable from './studios/map_clickable';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import BasicTabs from './class/Tab';
import Studio from './studios/studio';
import ViewProfile from './accounts/view_profile';
import EditProfile from './accounts/edit_profile';
import MyClassTab from './class/MyClassTab';
import AllStudiosSearch from './studios/filter_studios_page';
import AllClassesSearch from './class/filter_class_page';
import MySubscription from './accounts/my_subscription';
import AllSubscriptions from './subscriptions/all_subscriptions';
import Subscribe from './subscriptions/subscribe';
import EditPayment from './subscriptions/edit_payment';
import UpdateSubscription from './subscriptions/update_subscription';
import PastPayments from './subscriptions/past_payments';
import FuturePayments from './subscriptions/future_payments';
import HomePage from './temphome/TempHome'
// get these from api call

const App = () => {

    const theme = createTheme({
        palette: {
        mode: 'dark',
        primary: {
          main: '#ffa000',
        },
        secondary: {
          main: '#ffecb3'
        }
      },
    })

  return (
    <ThemeProvider theme={theme}>
    <Router>
      <Routes>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/view_profile' element={<ViewProfile/>}/>
        <Route path='/edit_profile' element={<EditProfile/>}/>
        <Route path='/map' element={<Map/>}/>
        <Route path='/find_studio' element={<FindStudio/>}/>
        <Route path='/all_studios' element={<AllStudios/>}/>
        <Route path='/add_pin' element={<MapClickable/>}/>
        <Route path='/all_studios/studio/:id' element={<Studio/>}/>
        <Route path='/all_studios_search' element={<AllStudiosSearch/>}/>
        <Route path='/all_classes_search' element={<AllClassesSearch/>}/>
        <Route path='/view_class/' element={<BasicTabs/>}/>
        <Route path='/view_my_class/' element={<MyClassTab/>}/>
        <Route path='/my_subscription/' element={<MySubscription/>}/>
        <Route path='/all_subscriptions/' element={<AllSubscriptions/>}/>
        <Route path='/subscribe/' element={<Subscribe/>}/>
        <Route path='/edit_payment' element={<EditPayment/>}/>
        <Route path='/update_subscription' element={<UpdateSubscription/>}/>
        <Route path='/past_payments' element={<PastPayments/>}/>
        <Route path='/future_payments' element={<FuturePayments/>}/>
        <Route path='/' element={<HomePage/>}/>
      </Routes>
    </Router>
    </ThemeProvider>
  );
};

export default App;
