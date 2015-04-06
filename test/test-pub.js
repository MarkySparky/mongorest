var request = require('supertest'),
    express = require('express');

process.env.NODE_ENV = 'test';

var app = require('../app.js');
var _id = '';


describe('POST New Pub', function(){
  it('creates new pub and responds with json success message', function(done){
    request(app)
    .post('/api/pub')
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .send({"pub": {"createdby":"In the early 2000s Wintjiya and her sister painted at Kintore, but in 2008 they were working from their home: \"the widows' camp ouside her 'son' Turkey Tolson's former residence\".","itemcount":26.26416073180735,"created":"1995-09-16T21:52:44.853Z"}})
    .expect(201)
    .end(function(err, res) {
      if (err) {
        throw err;
      }
      _id = res.body._id;
      done();
    });
  });
});

describe('GET List of Pubs', function(){
  it('responds with a list of pub items in JSON', function(done){
    request(app)
    .get('/api/pubs')
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(200, done);
  });
});

describe('GET Pub by ID', function(){
  it('responds with a single pub item in JSON', function(done){
    request(app)
    .get('/api/pub/'+ _id )
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(200, done);
  });
});


describe('PUT Pub by ID', function(){
  it('updates pub item in return JSON', function(done){
    request(app)
    .put('/api/pub/'+ _id )
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .send({ "pub": { "title": "Hell Is Where There Are No Robots" } })    
    .expect(200, done);
  });
});

xdescribe('DELETE Pub by ID', function(){
  it('should delete pub and return 200 status code', function(done){
    request(app)
    .del('/api/pub/'+ _id) 
    .expect(204, done);
  });
});