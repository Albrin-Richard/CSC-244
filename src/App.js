import React, { useEffect, useState } from 'react'
import { CssBaseline } from '@material-ui/core';
import { Navbar, Products, Cart, Checkout, Orders } from './components';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes  } from 'react-router-dom';

const App = () => {

  const [products, setProducts] = useState('');
  const [cart, setCart] = useState({products:[]});
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [order, setOrder] = useState({});
  const [orderAddr, setOrderAddr] = useState({});
  const [orderId, setOrderId] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
 
  const url = "http://localhost:3000";
  
  
 //get car list data from api
  const getAllCars = async () => {
    axios.get(url+"/rentalCars")
    .then((response) => {
      const productRes = response.data;
      setProducts(productRes);
      //console.log(products.length);
    })
    .catch(error => console.error(`Error: ${error}`));

  };

  // Cart
  const fetchCart = async () => {
    axios.get(url+"/cart")
    .then((response) => {
      const cartRes = response.data[0];
      setCart(cartRes);
      console.log(cartRes);
    })
    .catch(error => console.error(`Error: ${error}`));
  };

  const handleAddToCart = async (productId, quantity, name, description, price, image) => {
    console.log(productId, quantity, name, description, price, image);
    axios.post(url+"/cart", {
      productId: productId, 
      quantity : quantity, 
      name : name, 
      description: description, 
      price: price, 
      image : image
    }).then((response) => {
      setCart(response.data);
      console.log(response.data);
      
    })
    .catch(error => console.error(`Error: ${error}`));
    //setCart(item.cart);
  };
  
  const handleRemoveFromCart = async (productId) => {
    console.log(productId);

    axios.delete(url+"/cart/"+productId).then((response) => {
      setCart(response.data);
      console.log(response.data);
      
    })
    .catch(error => console.error(`Error: ${error}`));
    
  };

  const handleEmptyCart = async () => {
    axios.delete(url+"/cart").then((response) => {
      setCart(response.data);
      console.log(response.data);
      
    })
    .catch(error => console.error(`Error: ${error}`));
  };

  const refreshCart = async () => {
    
    axios.delete(url+"/cart").then((response) => {
      setCart(response.data);
      console.log(response.data);
      
    })
    .catch(error => console.error(`Error: ${error}`));
    
  };

  // Orders
  const fetchOrders= async () => {
    axios.get(url+"/orders")
    .then((response) => {
      const ordersRes = response.data;
      setOrder(ordersRes);
      console.log("-------------------");
      console.log(ordersRes);
    })
    .catch(error => console.error(`Error: ${error}`));
  };
  //POST - add to order

  const addToOrder = async (newOrder, addr) => {
    
    //console.log(newOrder);
    axios.post(url+"/orders", {
      userId: newOrder.userId, 
      total: newOrder.total,
      products: newOrder.products,
      address: addr
    }).then((response) => {
      setCart(response.data);
      console.log(response.data);
      setOrderId(response.data._id);
      
    })
    .catch(error => console.error(`Error: ${error}`));
    //setCart(item.cart);
    
  };

  

  const handleCaptureCheckout = async (newOrder, orderAddrs) => {
    try {
      
      setOrder(newOrder);
      setOrderAddr(orderAddrs);
      console.log("-----order-----");
      //console.log(newOrder);
      //console.log(orderAddrs);
      addToOrder(newOrder, orderAddrs);
      refreshCart();
    } catch (error) {
      setErrorMessage(error.data.error.message);
    }
  };
  useEffect(() => {
    getAllCars();
    fetchCart();
    fetchOrders();
  }, []);
  
//console.log(cart);
//console.log("-------------------");
//console.log(cart.products.length);
//console.log(products.length);
//console.log(cart.products.length);


//console.log("-------------------");
  //const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  return (
    
  <Router>
  <div style={{ display: 'flex' }}>
    <CssBaseline />
    <Navbar totalItems={cart.products.length}  />
    <Routes>
      <Route exact path="/" element={<Products products={products} onAddToCart={handleAddToCart} />}/>
      <Route exact path="/cart" element={<Cart cart={cart} onRemoveFromCart={handleRemoveFromCart} onEmptyCart={handleEmptyCart}/>}/>  
      <Route exact path="/checkout" element={<Checkout cart={cart}  onCaptureCheckout={handleCaptureCheckout} orderId={orderId}/>}/>
      <Route exact path="/orders" element={<Orders orders={order}/>}/>
    
    </Routes>
    </div>
  </Router>

  );
}

export default App
