/**
 * the entrance of server
 */
const express = require('express');
const router = require('./router');
const bodyParser = require('body-parser');
var app = express();

//open static resource
app.use('/node_modules',express.static('./node_modules'));
app.use('/public',express.static('./public'));

//template engine
app.engine('html', require('express-art-template'));

//config body-parser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//router
app.use(router)

//listening port 80
app.listen(80, function () {
  console.log('running server');
});