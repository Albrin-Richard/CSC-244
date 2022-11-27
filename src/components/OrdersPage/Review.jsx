import React from 'react';
import { Typography, List, ListItem, ListItemText, Divider } from '@material-ui/core';

const Review = ({ checkoutToken }) => (
  <>
    <Typography variant="h6" gutterBottom>Order summary</Typography>
    <Typography variant="body1">Order Id: {checkoutToken._id}</Typography>
    
    <Typography variant="body2" style={{ padding: '10px 0' }}>Date and Time: {checkoutToken.createdAt}</Typography>
    <Divider />
    <Typography variant="body2" style={{ padding: '10px 0' }}>Billing Address: {checkoutToken.address.firstName} {checkoutToken.address.lastName}</Typography>   
    <Typography variant="body2">{checkoutToken.address.address1}</Typography> 
    <Typography variant="body2">{checkoutToken.address.city}, {checkoutToken.address.zip}</Typography>    
    <Typography variant="body2" style={{ padding: '10px 0' }}>Email: {checkoutToken.address.email}</Typography> 
    <Divider />
    <List disablePadding>
      {checkoutToken.products.map((product) => (
        <ListItem style={{ padding: '10px 0' }} key={product._id}>
          <ListItemText primary={product.name} secondary={`Model: ${product.description}`} />
          <Typography variant="body2">${product.price}.00 /day</Typography>
        </ListItem>
      ))}
       <Divider />
      <ListItem style={{ padding: '10px 0' }}>
        <ListItemText primary="Total" />
        <Typography variant="subtitle1" style={{ fontWeight: 700 }}>
          ${checkoutToken.total}.00
        </Typography>
      </ListItem>
    </List>
  </>
);

export default Review;