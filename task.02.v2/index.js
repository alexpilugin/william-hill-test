'use strict';
var express = require('express')
var path = require('path')
var app = express()

app.use(express.static(path.join(__dirname + '/public')));

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'public/index.html'));
});

var config = {};

config.PORT = 3030;

var server = app.listen(config.PORT, () => {
  console.log('Server started on 3030 port at:' + Date());
});