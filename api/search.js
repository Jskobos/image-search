'use strict'

const request = require('request')
const Google  = require('google-search')

// Import Mongoose schema.
const SearchRecord = require('./schema')

const search = (app) => {

  const googleSearch = new Google({
    key: process.env.GOOGLE_APIKEY,
    cx: process.env.GOOGLE_CX
  })

  app.get('/imagesearch/:searchQuery', (req,res) => {
    let query = req.params.searchQuery
    let offset = req.query.offset || 1
    googleSearch.build({
      q: query,
      start: offset,
      searchType: 'image',
      fields: 'items(link,snippet,image/thumbnailLink,image/contextLink)'
    },(err,docs) => {
      if (err) return console.error(err)
      addEntry(query)
      res.json(formatResults(docs.items))
    })
  })
}

const addEntry = (query) => {
  let entry = new SearchRecord({
    term: query,
    when: new Date()
  })
  entry.save((err,res) => {
    console.log('Database updated.')
  })
}

const formatResults = (items) => {
  let results = []
  items.forEach((el) => {
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
