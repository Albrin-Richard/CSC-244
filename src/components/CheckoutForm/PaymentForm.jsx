import React from 'react';
import { Typography, Button, Divider } from '@material-ui/core';
import { PaymentInputsWrapper, usePaymentInputs } from 'react-payment-inputs';
import images from 'react-payment-inputs/images';

import Review from './Review';



const PaymentForm = ({ cart, nextStep, backStep,  onCaptureCheckout }) => {

    const {
        wrapperProps,
        getCardImageProps,
        getCardNumberProps,
        getExpiryDateProps,
        getCVCProps
      } = usePaymentInputs();
  
const handleSubmit = async (e) => {
        e.preventDefault();
        onCaptureCheckout(cart);
        nextStep();
}
  return (
    <>
      <Review checkoutToken={cart} />
      <Divider />
      <Typography variant="h6" gutterBottom style={{ margin: '20px 0' }}>Payment method</Typography>
      
      <form onSubmit={(e) => handleSubmit(e)}>
       
        <PaymentInputsWrapper {...wrapperProps}>
        <svg {...getCardImageProps({ images })} />
        <input {...getCardNumberProps()} />
        <input {...getExpiryDateProps()} />
        <input {...getCVCProps()} />
        </PaymentInputsWrapper>
        <br /> <br />

        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Button variant="outlined" onClick={backStep}>Back</Button>
              <Button type="submit" variant="contained"  color="primary">
                Pay ${cart.total}.00
              </Button>
        </div>
      </form>
      
      
    </>
  );
};

export default PaymentForm;