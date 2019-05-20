/**
 * router for server
 */
var express = require('express');
var fs = require('fs');
var dataModel = require('./dataModel.js')

var router = express.Router();

router.get('/', function (req, res){
  dataModel.find(function(err, data){
    if (err){
      return res.status(500).send('Server Error')
    }
    res.render('index.html', {
        dbData:data
    });
  })
});

router.get('/new', function (req, res){
  res.render('new.html')
});

router.post('/new', function (req, res){
  dataModel.save(req.body, function (err){
    if(err){
      return res.status(500).send('Server Error')
    }
    res.redirect('/')
  })
   
}); 

router.get('/edit', function (req, res){
  dataModel.findByID(req.query.id, function(err, dbData){
    if (err)
      return res.status(500).send('Server Error')
    if (dbData == undefined)
      return res.status(500).send('no student')
    res.render('edit.html', {
      dbData:dbData
    })

  })
});

router.post('/edit', function (req, res){
  dataModel.updateByID(req.body, function(err){
    if (err)
      return res.status(500).send('Server Error')
    res.redirect('/')
  })
});

router.get('/delete', function (req, res){
  dataModel.delete(req.query.id, function(err){
    if(err)
      return res.status(500).send('Server Error')
    res.redirect('/')
  })
});

module.exports = router;