'use strict'

const Ouch = require('ouch')
const http = require('http')
const requireStack = require('../index')
const Inspector = require('ouch/exception/Inspector')

http.createServer(function (req,res) {

  if(req.url === '/favicon.ico'){
    res.end()
    return
  }

  try{
    requireStack('./error')
  }catch(e){

    const i = new Inspector(e)
    var lines = e.stack.split('\n').slice(1)

    console.log(e.stack)

    var ouchInstance = (new Ouch).pushHandler(
        new Ouch.handlers.PrettyPageHandler('orange', null, 'sublime')
    );
    ouchInstance.handleException(e, req, res, function (output) {
        console.log('Error handled properly')
    });
  }

}).listen('1338', 'localhost')