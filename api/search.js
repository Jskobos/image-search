const request = require('request')

module.exports = (schema, app) => {

  app.get('/imagesearch/:searchQuery', (req,res) => {
    let query = req.params.searchQuery
    let entry = new schema({
      term: query,
      when: new Date()
    })
    entry.save((err,res) => {
      console.log('saved!')
    })
    res.json([{response: req.params.searchQuery}])
  })
}
