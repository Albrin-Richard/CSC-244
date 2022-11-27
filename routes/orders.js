const express = require('express')
const router = express.Router()

const Order = require('../models/order')

//get
router.get('/', async (req, res) => {
    try {
      const orderList = await Order.find({});
      //console.log(shopCart);
      
      const jsonObj = JSON.parse(JSON.stringify(orderList));

      if(jsonObj.length == 0){

        console.log(`No orders `);
        //console.log(jsonObj.length);  
        res.send([]);
      }
      else {
        
        console.log(jsonObj);

        res.send(jsonObj);
     }
     
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
    
  })

  //post
router.post("/", async (req, res) => {
    const { userId, total, products, address } = req.body;
  
    //const userId = "5de7ffa74fff640a0491bc4f"; //TODO: the logged in user id
  
    try {
      
        //no cart for user, create new cart
        const newOrder = await Order.create({
          userId: userId,
          total: total,
          products: products,
          address: address
        });
  
        return res.status(201).send(newOrder);
      
    } catch (err) {
      console.log(err);
      res.status(500).send("Something went wrong");
    }
  });

  module.exports = router