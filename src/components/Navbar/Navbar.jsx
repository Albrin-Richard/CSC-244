import React from 'react';
import { AppBar, Toolbar, IconButton, Badge, Typography } from '@material-ui/core';
import { ShoppingCart } from '@material-ui/icons';
import { Link, useLocation } from 'react-router-dom';

import logo from '../../assets/caricon.png';
import useStyles from './styles';

const NavBar = ({ totalItems}) => {
  
  const classes = useStyles();
  const location = useLocation();
  
  return (
    <>
      <AppBar position="fixed" className={classes.appBar} color="inherit">
        <Toolbar>
          <Typography  component={Link} to="/" variant="h6" className={classes.title} color="inherit">
            <img src={logo} alt="commerce.js" height="25px" className={classes.image} /> Car Rental Booking System
          </Typography>
          <div className={classes.grow} />
          
          {location.pathname === '/' && (
          <div className={classes.button}>
            <Typography  component={Link} to="/orders" variant="h6" className={classes.order} color="inherit">
            Orders
          </Typography>
            <IconButton  component={Link} to="/cart" aria-label="Show cart items" color="inherit">
              <Badge overlap="rectangular" badgeContent={totalItems} color="secondary">
                <ShoppingCart />
              </Badge>
            </IconButton>
          </div>
          )}
        </Toolbar>
      </AppBar>
      
    </>
  );
};

export default NavBar;