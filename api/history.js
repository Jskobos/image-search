'use strict'

// Import Mongoose schema.
const SearchRecord = require('./schema')

const history = (app) => {

  app.get('/latest/imagesearch', (req,res) => {
    SearchRecord.find()
      .limit(10)
      .sort('-when')
      .select('term when -_id')
      .exec((err, results) => {
        if (err) { return console.error(err) }
        res.json(results)
      })
  })

}

module.exports = history
