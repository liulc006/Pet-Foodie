const express = require('express');
const app = express.Router();
const { User } = require('../db');

module.exports = app;

app.post('/', async (req, res, next) => {
  try {
    res.send(await User.create(req.body));
  } catch (ex) {
    next(ex);
  }
});

app.put('/:id', async(req, res, next)=> {
  try {
    let user = await User.findByPk(req.params.id)
    res.send(await user.update(req.body));
  }
  catch(ex){
    next(ex);
  }
});

app.get('/', async(req, res, next) => {
  try{
    const response = await User.findAll();
    res.send(response);
  } catch (err) {
    next(err);
  }
});

