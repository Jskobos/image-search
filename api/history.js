search = (schema, app) => {

  app.get('/latest/imagesearch', (req,res) => {
    schema.find()
          .limit(10)
          .sort('-when')
          .select('term when -_id')
          .exec((err, results) => {
            if (err) { return console.error(err) }
            res.json(results)
          })
  })

}

module.exports = search
