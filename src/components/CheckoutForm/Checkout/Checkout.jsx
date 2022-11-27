import React, { useState, useEffect } from 'react';
import { CssBaseline, Paper, Stepper, Step, StepLabel, Typography, CircularProgress, Divider, Button } from '@material-ui/core';
import { Link, useNavigate } from 'react-router-dom';


import AddressForm from '../AddressForm';
import PaymentForm from '../PaymentForm';
import useStyles from './styles';


const steps = ['Billing address', 'Payment details'];

const Checkout = ({ cart, onCaptureCheckout, orderId}) => {
  
const [shippingData, setShippingData] = useState({});
  const [activeStep, setActiveStep] = useState(0);
  const classes = useStyles();



  const nextStep = () => setActiveStep((prevActiveStep) => prevActiveStep + 1);
  const backStep = () => setActiveStep((prevActiveStep) => prevActiveStep - 1);

  
  let Confirmation = () => (
    <>
      <div>
        <Typography variant="h5">Thank you for your purchase, {shippingData.firstName} {shippingData.lastName}!</Typography>
        <Divider className={classes.divider} />
        <Typography variant="subtitle2">Order ref: {orderId}</Typography>
      </div>
      <br />
      <Button component={Link} variant="outlined" type="button" to="/">Back to home</Button>
    </>
  );

  const test = (data) => {
    setShippingData(data);
    console.log(data);
    nextStep();
  };

  

  const Form = () => (activeStep === 0
    ? <AddressForm setShippingData={setShippingData} test={test}/>
    : <PaymentForm cart={cart} nextStep={nextStep} backStep={backStep} shippingData={shippingData} onCaptureCheckout={onCaptureCheckout}/>);

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
          {activeStep === steps.length ? <Confirmation /> : <Form />}
        </Paper>
      </main>
    </>
  );
};

export default Checkout;