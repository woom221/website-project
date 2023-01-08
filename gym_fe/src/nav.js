import * as React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';
import PropTypes from 'prop-types';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';

function Nav( {isAuthenticated} ) {
    const navigate = useNavigate();
    const sectionsGeneral = {
        'ABOUT US': '/',
        'FIND STUDIOS': '/find_studio',
        'SUBSCRIPTIONS': '/all_subscriptions'
    }
    const secGenArr = ['ABOUT US', 'FIND STUDIOS', 'SUBSCRIPTIONS']
    const sectionsLoggedIn = {
        'MY SCHEDULE': '/view_my_class/',
        'PROFILE': '/view_profile',
        'LOG OUT': '',
        'MY SUBSCRIPTION': '/my_subscription'
    }
    const secInArr = ['MY SCHEDULE', 'MY SUBSCRIPTION', 'PROFILE', 'LOG OUT']
    const sectionsLoggedOut = {
        'LOG IN': '/login',
        'SIGN UP': '/register',
    }
    const secOutArr = ['LOG IN', 'SIGN UP']
    return (
        <Toolbar
            component="nav"
            variant="dense"
            sx={{ justifyContent: 'space-between', overflowX: 'auto',  }}
        >
            {secGenArr.map((section) => {
                return <Button key={section} onClick={() => navigate(sectionsGeneral[section])}>{section}</Button>
            })}
            {isAuthenticated ? (
                secInArr.map((section) => {
                    if (section === 'LOG OUT') {
                        return <Button key={section} onClick={() => {
                            localStorage.removeItem('token');
                            localStorage.removeItem('userID');
                            localStorage.removeItem('username');
                            navigate('/login')
                        }}>{section}</Button>
                    }
                    return <Button key={section} onClick={() => navigate(sectionsLoggedIn[section])}>{section}</Button>
                })) : (secOutArr.map((section) => {
                    return <Button key={section} onClick={() => navigate(sectionsLoggedOut[section])}>{section}</Button>
                }))
            }
        </Toolbar>
    );
}

export default Nav;
