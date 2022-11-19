const express = require('express')
const router = express.Router()

const RentalCar = require('../models/rentalCar')
var j=0;
var carImages = ["https://s7d1.scene7.com/is/image/hyundai/2022-sonata-1?wid=1200&hei=630&qlt=85,0&fmt=webp",
              "https://s.aolcdn.com/os/ab/_cms/2022/10/19200114/Honda-Civic-Sport-Touring.jpg",
              "https://media.ed.edmunds-media.com/maserati/quattroporte/2019/oem/2019_maserati_quattroporte_sedan_gts-gransport_fq_oem_1_1600.jpg",
              "https://www.autotrader.com/wp-content/uploads/2020/03/1-19.jpg?w=1024",
              "https://media.ed.edmunds-media.com/tesla/model-s/2021/oem/2021_tesla_model-s_sedan_plaid_fq_oem_1_600.jpg",
              "https://www.autotrader.com/wp-content/uploads/2020/02/2020-Tesla-Model-S-.15..jpg?w=1024",
              "https://vcdn1-vnexpress.vnecdn.net/2022/09/16/-2779-1663316839.jpg?w=680&h=0&q=100&dpr=1&fit=crop&s=67XlPHvRa-cO5_bWn5LUbA",
              "https://www.motortrend.com/uploads/sites/5/2021/08/2022-Mercedes-Benz-S-500-S-580-4Matic-28.jpg"];

// Getting all
router.get('/', async (req, res) => {
  try {
    const rentalCar = await RentalCar.find({"location.state": 'CA'}).limit(16);
    
    const jsonObj = JSON.parse(JSON.stringify(rentalCar));
    console.log(jsonObj);
    
    

   // Store the results in an array
   var array = [];
     const results = jsonObj;
     //console.log(results);
     // Print the results
     if (results.length > 0) {
         console.log(`Found listing(s) with at Ratings:`);
         results.forEach((result, i) => {
          //handle images with 8 images  
          j=i;
             if(j>=8){j=i-8;}
          array.push( {id: parseInt(jsonObj[i].Index), name: jsonObj[i].vehicle.make, description: jsonObj[i].vehicle.model, price: jsonObj[i].rate.daily, image: carImages[j]});

         });
         
         res.send(array);
     } else {
        
         console.log(`No listing(s) `);
     }
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
  
})
module.exports = router