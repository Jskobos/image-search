const request = require('request')
const base_url = 'http://localhost:3000'

describe("Image search API", function() {
  describe("/GET", function() {
    it("returns status code 200", function(done) {
      request.get(base_url, function(error, response, body) {
        expect(response.statusCode).toBe(200);
        done();
      });
    });
    it("renders a home page", (done) => {
      request.get(base_url, (error, response, body) => {
        expect(body).toMatch("Image Search API");
        done();
      });
    });
    it("accepts a search query parameter", (done) => {
      request.get(base_url + "/imagesearch/lolcats%20funny", (error, response, body) => {
        body = JSON.parse(body);
        let result = body[0];
        expect(result['url']).toBeDefined();
        expect(result['snippet']).toBeDefined();
        expect(result['thumbnail']).toBeDefined();
        expect(result['context']).toBeDefined();
        done();
      });
    });
    it("accepts a paging offset", function(done) {
      request.get(base_url + "/imagesearch/lolcats%20funny?offset=10", function(error, response, body) {
        body = JSON.parse(body);
        expect(body.length).toBe(10);
        done();
      });
    });
    it("returns the latest search history", function(done) {
      request.get(base_url + "/latest/imagesearch/", function(error, response, body) {
        body = JSON.parse(body);
        let result = body[0];
        expect(result['term']).toBeDefined();
        expect(result['when']).toBeDefined();
        expect(response.statusCode).toBe(200);
        done();
      });
    });
  });
});
