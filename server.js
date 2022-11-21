require('dotenv').config()
var cors = require('cors')


const express = require('express')
const app = express()
const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://team04:csc244team04@cluster0.fnexleo.mongodb.net/rentalCar', { useNewUrlParser: true })
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Database'))

app.use(cors())

app.use(express.json())

const rentalCarsRouter = require('./routes/rentalCars')
app.use('/rentalCars', rentalCarsRouter)

const shoppingCartRouter = require('./routes/shoppingCart')
app.use('/cart', shoppingCartRouter)


app.listen(3000, () => console.log('Server Started'))
