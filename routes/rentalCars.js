const express = require('express')
const router = express.Router()

const RentalCar = require('../models/rentalCar')
var j=0;
var carImages = [
              "https://s.aolcdn.com/os/ab/_cms/2022/10/19200114/Honda-Civic-Sport-Touring.jpg",
              "https://www.autotrader.com/wp-content/uploads/2020/03/1-19.jpg?w=1024",
              "https://media.ed.edmunds-media.com/tesla/model-s/2021/oem/2021_tesla_model-s_sedan_plaid_fq_oem_1_600.jpg",
              "https://vcdn1-vnexpress.vnecdn.net/2022/09/16/-2779-1663316839.jpg?w=680&h=0&q=100&dpr=1&fit=crop&s=67XlPHvRa-cO5_bWn5LUbA",
              "https://www.motortrend.com/uploads/sites/5/2021/08/2022-Mercedes-Benz-S-500-S-580-4Matic-28.jpg",
              "https://cdn.motor1.com/images/mgl/ZJgy3/s1/2020-chevrolet-camaro-ss.webp",
              "https://ls1tech.com/wp-content/uploads/2020/06/lssky1.jpg",
              "https://www.motortrend.com/uploads/2021/11/2022-Dodge-Challenger-TA-5-7-Hemi-9.jpg?fit=around%7C875:492.1875"
          ];

// Getting all
router.get('/', async (req, res) => {
  try {
    const rentalCar = await RentalCar.find({"location.state": 'CA'}).limit(16);
    
    const jsonObj = JSON.parse(JSON.stringify(rentalCar));
    //console.log(jsonObj);
    
   // Store the results in an array
   var array = [];
     const results = jsonObj;
     console.log(results);
     // Print the results
     if (results.length > 0) {
         //console.log(`Found listing(s) with at Ratings:`);
         results.forEach((result, i) => {
          //handle images with 8 images  
          j=i;
             if(j>=8){j=i-8;}
          array.push( {id: parseInt(jsonObj[i].Index), name: jsonObj[i].vehicle.make, description: jsonObj[i].vehicle.model, price: jsonObj[i].rate.daily, image: carImages[j]});

         });
         
         res.send(array);
     } else {
        
        console.log(`No listing(s) `);
        res.send("No Data present");
     }
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
  
})
module.exports = router