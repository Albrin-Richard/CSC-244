const {MongoClient} = require('mongodb');
 
async function main() {
    
    const uri = "mongodb+srv://team04:csc244team04@cluster0.fnexleo.mongodb.net/carRentalData";
  
    
    const client = new MongoClient(uri);

    try {
        // Connect to the MongoDB cluster
        await client.connect();

        // Make the appropriate DB calls

        // Find the listing named "Infinite Views" that we created in create.js
        //await findOneListingByName(client, "Infinite Views");

        // Find up to 5 listings with at least 4 bedrooms and at least 2 bathrooms
        // If you recently ran create.js, a listing named Beautiful Beach House should be included in the results 
        const carList = await findCarListingsCA(client, {
            locationState : "CA",
            rating: "4.5",
             maximumNumberOfResults: 8
          });

        //console.log(carList);
        return carList;
        

    } finally {
        // Close the connection to the MongoDB cluster
        await client.close();
        
    }
}

//main().catch(console.error);

 /**
  * Print an Airbnb listing with the given name
  * Note: If more than one listing has the same name, only the first listing the database finds will be printed.
  * @param {MongoClient} client A MongoClient that is connected to a cluster with the sample_airbnb database
  * @param {String} nameOfListing The name of the listing you want to find
  */
 async function findOneListingByName(client, nameOfListing) {
     // See https://mongodb.github.io/node-mongodb-native/3.6/api/Collection.html#findOne for the findOne() docs
     const result = await client.db("rentalCar").collection("rentalCarData").findOne({ "location.state" : "CA"});
 
     if (result) {
         console.log(`Found a listing in the collection with the name '${nameOfListing}':`);
         console.log(result);
     } else {
         console.log(`No listings found with the name '${nameOfListing}'`);
     }
 }
 
 /**
  * Print Airbnb listings with a minimum number of bedrooms and bathrooms.
  * Results will be limited to the designated maximum number of results.
  * Results will be sorted by the date of the last review in descending order.
  * @param {MongoClient} client A MongoClient that is connected to a cluster with the sample_airbnb database
  * @param {object} queryParams The query params object
  * @param {number} queryParams.minimumNumberOfBedrooms The minimum number of bedrooms
  * @param {number} queryParams.minimumNumberOfBathrooms The minimum number of bathrooms
  * @param {number} queryParams.maximumNumberOfResults The maximum number of Airbnb listings to be printed
  */
 async function findCarListingsCA(client, {
    locationState,
    rating,
     maximumNumberOfResults = Number.MAX_SAFE_INTEGER
 } = {}) {
 
     // See https://mongodb.github.io/node-mongodb-native/3.6/api/Collection.html#find for the find() docs
     
     const cursor = client.db("rentalCar").collection("rentalCarData")
         .find({
            fuelType : "HYBRID",
            rating: { $gte: '4.5' }
         }
         )
         .sort({ last_review: -1 })
         .limit(maximumNumberOfResults);
 
     // Store the results in an array
     const results = await cursor.toArray();
     //console.log(results);
     // Print the results
     if (results.length > 0) {
         console.log(`Found listing(s) with at ${locationState} bedrooms and Above ${rating} Ratings:`);
         results.forEach((result, i) => {
             const date = new Date(result.last_review).toDateString();
 
             console.log();
             console.log(`${i + 1}. Make: ${result.vehicle.make}`);
             console.log(`   _id: ${result._id}`);
             console.log(`   Model: ${result.vehicle.model}`);
             console.log(`   Rating: ${result.rating}`);
             console.log(`   Rating: ${result.fuelType}`);
             console.log(`   Rate: ${result.rate.daily}`);
         });
         
         return results;
     } else {
        
         console.log(`No listing(s) with at ${locationState} bedrooms and Above ${rating} Ratings:`);
     }
}

 