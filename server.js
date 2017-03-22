const express  = require('express')
const path     = require('path')
const mongoose = require('mongoose')
const port     = process.env.PORT || 3000
const dblink   = 'mongodb://imagesearcher:cryogeniccascade@ds139360.mlab.com:39360/jkis2017'
const app      = express()

// Import API endpoints.
const search = require('./api/search')
const history = require('./api/history')

// Import Mongoose schema.
const SearchRecord = require('./schema')

// Render instructions page on root route request.
app.get('/', (req,res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'))
})

mongoose.connect(dblink)

let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', () => {

  // Setup search routing and callbacks.
  search(SearchRecord, app)

  // Setup history routing and callbacks.
  history(SearchRecord, app)

})

app.listen(port, () => { console.log('Express app listening on port ' + port) })
