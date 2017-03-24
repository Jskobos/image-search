const request = require('request')
const Google  = require('google-search')


// Import Mongoose schema.
const SearchRecord = require('./schema')

search = (app) => {

  const googleSearch = new Google({
    key: process.env.GOOGLE_APIKEY,
    cx: process.env.GOOGLE_CX
  })

  app.get('/imagesearch/:searchQuery', (req,res) => {
    let query = req.params.searchQuery
    let offset = 10
    googleSearch.build({
      q: query,
      num: offset,
      searchType: 'image',
      fields: 'items(link,snippet,image/thumbnailLink,image/contextLink)'
    },(err,docs) => {
      if (err) return console.error(err)
      console.log(docs)
      addEntry(query)
      res.json(formatResults(docs.items))
    })
  })
}

addEntry = (query) => {
  let entry = new SearchRecord({
    term: query,
    when: new Date()
  })
  entry.save((err,res) => {
    console.log('Database updated.')
  })
}

formatResults = (items) => {
  let results = []
  items.forEach((el) => {
    console.log(el)
    let temp = {
      url: el.link,
      snippet: el.snippet,
      thumbnail: el.image.thumbnailLink,
      context: el.image.contextLink
    }
    results.push(temp)
  })
  return results
}

module.exports = search
