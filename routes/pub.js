module.exports = function(app) {
  // Module dependencies.
  var mongoose = require('mongoose'),
      Pub = mongoose.models.Pub,
      api = {};

  // ALL
  api.pubs = function (req, res) {
    Pub.find(function(err, pubs) {
      if (err) {
        res.json(500, err);
      } else {    
        res.json({pubs: pubs});
      }
    });
  };

  // GET
  api.pub = function (req, res) {
    var id = req.params.id;
    Pub.findOne({ '_id': id }, function(err, pub) {
      if (err) {
        res.json(404, err);
      } else {
        res.json({pub: pub});
      }
    });
  };

  // POST
  api.addPub = function (req, res) {
    
    var pub;
      
    if(typeof req.body.pub == 'undefined'){
         res.status(500);
         return res.json({message: 'pub is undefined'});
    }

    pub = new Pub(req.body.pub);

    pub.save(function (err) {
      if (!err) {
        console.log("created pub");
        return res.json(201, pub.toObject());
      } else {
        return res.json(500, err);
      }
    });

  };

  // PUT
  api.editPub = function (req, res) {
    var id = req.params.id;

    Pub.findById(id, function (err, pub) {


    
      if(typeof req.body.pub["createdby"] != 'undefined'){
        pub["createdby"] = req.body.pub["createdby"];
      }  
    
      if(typeof req.body.pub["itemcount"] != 'undefined'){
        pub["itemcount"] = req.body.pub["itemcount"];
      }  
    
      if(typeof req.body.pub["created"] != 'undefined'){
        pub["created"] = req.body.pub["created"];
      }  
    

      return pub.save(function (err) {
        if (!err) {
          console.log("updated pub");
          return res.json(200, pub.toObject());        
        } else {
         return res.json(500, err);
        }
        return res.json(pub);
      });
    });

  };

  // DELETE
  api.deletePub = function (req, res) {
    var id = req.params.id;
    return Pub.findById(id, function (err, pub) {
      return pub.remove(function (err) {
        if (!err) {
          console.log("removed pub");
          return res.send(204);
        } else {
          console.log(err);
          return res.json(500, err);
        }
      });
    });

  };


  app.get('/api/pubs', api.pubs);
  app.get('/api/pub/:id', api.pub);
  app.post('/api/pub', api.addPub);
  app.put('/api/pub/:id', api.editPub);
  app.delete('/api/pub/:id', api.deletePub);
};