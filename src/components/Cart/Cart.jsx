import React from 'react';
import { Container, Typography, Button, Grid } from '@material-ui/core';
import { Link } from 'react-router-dom';

import CartItem from './CartItems/CartItems';
import useStyles from './styles';

const Cart = ({ cart, onRemoveFromCart,  onEmptyCart }) => {
  const classes = useStyles();
  
  const handleEmptyCart = () => onEmptyCart();

  const renderEmptyCart = () => (
    <Typography variant="subtitle1"> You have no items in your shopping cart,
      <Link className={classes.link} to="/">start adding some</Link>!
    </Typography>
  );

  if (!cart.products) return 'Loading';

  const renderCart = () => (
    <>
      <Grid container spacing={3}>
        {cart.products.map((lineItem) => (
            
          <Grid item xs={12} sm={4} key={lineItem.productId}>
            <CartItem item={lineItem}  total={cart.total} onRemoveFromCart={onRemoveFromCart}/>
          </Grid>
        ))}
      </Grid>
      <div className={classes.cardDetails}>
        <Typography variant="h4">Subtotal: ${cart.total}</Typography>
        <div>
          <Button className={classes.emptyButton} size="large" type="button" variant="contained" color="secondary" onClick={handleEmptyCart}>Empty cart</Button>
          <Button className={classes.checkoutButton}  component={Link} to="/checkout" size="large" type="button" variant="contained" color="primary">Checkout</Button>
        </div>
      </div>
    </>
  );

  return (
    <Container>
      <div className={classes.toolbar} />
      <Typography className={classes.title} variant="h3" gutterBottom>Your Shopping Cart</Typography>
      { !cart.products.length ? renderEmptyCart() : renderCart() }
    </Container>
  );
};

export default Cart;