'use strict'

const request = require('request')

const rewire = require('rewire')

// Import non-exported function from api/search.js
const search = rewire('../api/search.js')
const formatResults = search.__get__('formatResults')

const base_url = 'http://localhost:3000'
let entry = {
  link: base_url,
  snippet: 'blah blah blah',
  image: {
    thumnailLink: base_url + '/thumbnail',
    contextLink: base_url + '/context'
  }
}

describe('Search', function() {
  describe('the formatResults function', function() {
    it('should return a correct json object', function() {
      let input = [entry, entry]
      let results = formatResults(input)
      expect(results[0].url).toMatch(input[0].link)
      expect(results[0].snippet).toMatch(input[0].snippet)
      expect(results[0].thumbnail).toMatch(input[0]['image']['thumbnailLink'])
    })
  })
})
