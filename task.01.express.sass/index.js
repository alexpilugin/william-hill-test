'use strict';
var express = require('express')
var sassMiddleware = require('node-sass-middleware');
var path = require('path')
var app = express()

app.use(express.static(path.join(__dirname + '/public')));
app.use(express.static(path.join(__dirname + '/public/images')));

//const srcPath = path.join(__dirname+'/public/sass');

app.use(sassMiddleware({
  /* Settings */
  src: __dirname,
  dest: __dirname,
  debug: true,
  outputStyle: 'compressed',
  //force: false, //force to recompile
  /* 
  src: __dirname + "scss",
  dest: __dirname + 'public',
  outputStyle: 'extended', // 'compressed' 
  force: true, //force to recompile
  debug: true,
  response: false,
  sourceMap: true,
  //indentedSyntax: true,
  //prefix:  '/static'  // Where prefix is at <link rel="stylesheets" 
  //log: function (severity, key, value) { winston.log(severity, 'node-saas-middleware   %s : %s', key, value); */
}));


app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'public/index.html'));
});


var config = {};

config.PORT = 3030;

var server = app.listen(config.PORT, () => {
  console.log('Server started on 3030 port at:' + Date());
});