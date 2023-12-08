require('dotenv').config()
const cors = require('cors')
const express = require('express')
const mongoose = require('mongoose')
const app = express()

// import Routes here
const userRoutes = require('../routes/account')

// Middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended : true }))
app.use((req, res, next) => {
  console.log(`${new Date().toLocaleDateString()} ${req.method}:${req.url}`); // Just Reminder
  next(); // use Next method
})

// Read Routes
app.use('/api/accounts', userRoutes)

// connect database
mongoose.connect(process.env.MONGO_URI, { dbName: 'mydatabase' }) // put here the database name
    .then(() => {
        // Listen for request
        app.listen(process.env.PORT, () => {
            console.log('Connected to database & Listening on port', process.env.PORT);
        });
    })
    .catch((error) => {
        console.log(error);
    })