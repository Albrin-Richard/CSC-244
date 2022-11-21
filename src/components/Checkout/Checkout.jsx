import React, { useState, useEffect } from 'react';
import { CssBaseline, Paper, Stepper, Step, StepLabel, Typography, CircularProgress, Divider, Button } from '@material-ui/core';
import useStyles from './styles';
const steps = ['Shipping address', 'Payment details'];

const Checkout = ({ cart, onCaptureCheckout, order, error }) => {
    const [activeStep, setActiveStep] = useState(0);
    const classes = useStyles();

const Form = () => (activeStep === 0
    ? <AddressForm checkoutToken={checkoutToken} nextStep={nextStep} setShippingData={setShippingData} test={test}/>;
   

    return (
        <>
          <CssBaseline />
          <div className={classes.toolbar} />
          <main className={classes.layout}>
            <Paper className={classes.paper}>
              <Typography variant="h4" align="center">Checkout</Typography>
              <Stepper activeStep={activeStep} className={classes.stepper}>
                {steps.map((label) => (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
              {activeStep === steps.length ? <Confirmation /> : checkoutToken && <Form />}
            </Paper>
          </main>
        </>
      );
    };