const express = require('express')
const router = express.Router()

const Cart = require('../models/cart')

//get
router.get('/', async (req, res) => {
    try {
      const shopCart = await Cart.find({});
      //console.log(shopCart);
      
      const jsonObj = JSON.parse(JSON.stringify(shopCart));

      if(jsonObj.length == 0){

        console.log(`No listing(s) `);
        //console.log(jsonObj.length);  
        res.send([{products:[]}]);
      }
      else {
        
        console.log(jsonObj);

        res.send(jsonObj);
     }
     
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
    
  })

// Deleting One
router.delete('/:id', getCar, async (req, res) => {
  
  const userId = "5de7ffa74fff640a0491bc4f"; 
  
    try {
      let cart = await Cart.findOne({ userId });
      console.log(cart.products[res.itemIndex].price);
      if (cart) {
      
      //Update Cart Total
      cart.total = cart.total - parseInt(cart.products[res.itemIndex].price);
      console.log(cart.total);
      console.log("------------------");
      
      //Delete the item from cart
      cart.products.splice(res.itemIndex, 1);
      
      //Save the cart
      cart = await cart.save();
      res.status(200).send(cart);
      }
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

//Delete all
router.delete('/', async (req, res) => {
  
  const userId = "5de7ffa74fff640a0491bc4f"; //TODO: the logged in user id
  
    try {
      let cart = await Cart.findOne({ userId });
      
      if (cart) {
      
      
      cart.total = 0;
      console.log(cart.total);
      console.log("------------------");

      cart.products = [];
      cart = await cart.save();
      res.status(200).send(cart);
      }
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

//post
router.post("/", async (req, res) => {
    const { productId, quantity, name, description, price, image } = req.body;
  
    const userId = "5de7ffa74fff640a0491bc4f"; //TODO: the logged in user id
  
    try {
      let cart = await Cart.findOne({ userId });
  
      if (cart) {
        //cart exists for user
        let itemIndex = cart.products.findIndex(p => p.productId == productId);
  
        if (itemIndex > -1) {
          //product exists in the cart, update the quantity
          let productItem = cart.products[itemIndex];
          productItem.quantity = quantity;
          cart.products[itemIndex] = productItem;
        } else {
          //product does not exists in cart, add new item
          cart.products.push({ productId, quantity, name, description, price, image });
          cart.total = parseInt(cart.total) + parseInt(price);
        }
        cart = await cart.save();
        return res.status(201).send(cart);
      } else {
        //no cart for user, create new cart
        const newCart = await Cart.create({
          userId,
          total:price,
          products: [{ productId, quantity, name, description, price, image }]
        });
  
        return res.status(201).send(newCart);
      }
    } catch (err) {
      console.log(err);
      res.status(500).send("Something went wrong");
    }
  });

  async function getCar(req, res, next) {
    
    const userId = "5de7ffa74fff640a0491bc4f"; //TODO: the logged in user id
    let itemIndex = null;
    try {
      let cart = await Cart.findOne({ userId });
      
      if (cart) {
        //cart exists for user
        itemIndex = cart.products.findIndex(p => p.productId == req.params.id);
        console.log(itemIndex);
        //subscriber = await Cart.pr.findById(req.params.id)
      if (itemIndex == -1) {
        return res.status(404).json({ message: 'Cannot find subscriber' })
        }
      }
    } catch (err) {
      return res.status(500).json({ message: err.message })
    }
  
    res.itemIndex = itemIndex
    next()
  }
  module.exports = router