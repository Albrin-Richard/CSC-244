import React, { useState, useEffect } from 'react';
import { CssBaseline, Paper, Stepper, Step, StepLabel, Typography, CircularProgress, Divider, Button } from '@material-ui/core';
import { Link, useNavigate } from 'react-router-dom';



import useStyles from './styles';
import Review from '../Review';



const Checkout = ({ orders}) => {
 
  const classes = useStyles();


    console.log(orders);
 
const renderEmptyOrders = () => (
    <Typography variant="subtitle1"> You have no upcoming Orders,
      <Link className={classes.link} to="/">start Booking</Link>!
    </Typography>
  ); 
  
  if (!orders) return 'Loading';

  const renderOrders = () => (
    <>
      {orders.map((order) => (
        <Paper className={classes.paper}>
          
          <Review checkoutToken={order} />
          
        </Paper>
        ))}
    </>
  );

  
  return (
    <>
      <CssBaseline />
      <div className={classes.toolbar} />
      <main className={classes.layout}>
      <Typography className={classes.title} variant="h3" gutterBottom>Your Orders</Typography>
      { !orders.length ? renderEmptyOrders() : renderOrders() }

      
      </main>
    </>
  );
};

export default Checkout;