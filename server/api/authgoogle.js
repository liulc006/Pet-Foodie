const express = require('express');
const app = express.Router();
const { User } = require('../db');

module.exports = app;

app.post('/', async(req, res, next)=> {
  try {
    // console.log(req.body)
    const response = await User.authgoogle(req.body)
    // console.log(response)
    res.send(response)
  }
  catch(ex){
    next(ex);
  }
});
