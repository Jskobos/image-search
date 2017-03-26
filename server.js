'use strict'

const express  = require('express')
const path     = require('path')
const mongoose = require('mongoose')
const port     = process.env.PORT || 3000

// Load configuration variables
require('dotenv').config()

const app = express()

// Import API endpoints.
const search = require('./api/search')
const history = require('./api/history')

// Render instructions page on root route request.
app.get('/', (req,res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'))
})

mongoose.connect(process.env.DB_LINK)

let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', () => {

  // Setup search routing and callbacks.
  search(app)

  // Setup history routing and callbacks.
  history(app)

})

// Start the server.
app.listen(port, () => { console.log('Express app listening on port ' + port) })
