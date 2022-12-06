const express = require('express');
const User = require('../db/User');
const app = express.Router();

module.exports = app;

app.put('/:id/:token', async(req, res, next) => {
    const { id, token } = req.params
    try{
        const olduser = await User.findByPk(id)
        // console.log(req.body) 
        res.send(await olduser.update(req.body))
        // console.log(olduser)
    }catch(ex){
        next(ex)
    }   
});
