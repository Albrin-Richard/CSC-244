import React, { useState, useEffect, useMemo } from 'react';
import { InputLabel, Select, MenuItem, Button, Grid, Typography } from '@material-ui/core';
import { useForm, FormProvider } from 'react-hook-form';
import { Link } from 'react-router-dom';
import countryList from 'react-select-country-list'
import SelectUSState from 'react-select-us-states';

import { commerce } from '../../lib/commerce';
import FormInput from './CustomTextField';

const AddressForm = ({test }) => {
  const [shippingCountries, setShippingCountries] = useState([]);
  const [shippingCountry, setShippingCountry] = useState('');
  
  const methods = useForm();

  const [value, setValue] = useState('')
  const options = useMemo(() => countryList().getData(), [])

  

  
  

  useEffect(() => {
    const options = countryList().getData();
    
    setShippingCountries(options);
    console.log(options);

  }, []);

  

  return (
    <>
      <Typography variant="h6" gutterBottom>Shipping address</Typography>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit((data) => test({ ...data}))} >
          <Grid container spacing={3}>
            <FormInput required name="firstName" label="First name" />
            <FormInput required name="lastName" label="Last name" />
            <FormInput required name="address1" label="Address line 1" />
            <FormInput required name="email" label="Email" />
            <FormInput required name="city" label="City" />
            <FormInput required name="zip" label="Zip / Postal code" />
            </Grid>
            
            
          <br />
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button component={Link} variant="outlined" to="/cart">Back to Cart</Button>
            <Button type="submit" variant="contained" color="primary">Book</Button>
          </div>
        </form>
      </FormProvider>
    </>
  );
};

export default AddressForm;