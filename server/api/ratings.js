const express = require('express');
const app = express.Router();
const { Rating, User } = require('../db');

module.exports = app;

app.get('/', async(req,res,next)=>{ // "/api/ratings"
    try{
        const rating = await Rating.findAll();
        res.send(rating);
    }
    catch(err){
        next(err);
    };
});

app.post('/addRating', async(req,res,next)=>{
    try{
        const {star, comment, productId} = req.body;
        const user = await User.findByToken(req.headers.authorization);
        const rating = await Rating.create({star: star, comment: comment, userId: user.id, productId: productId});
        res.send(rating);
    }
    catch(err){
        next(err);
    };
});

app.get('/user/:id', async(req,res,next)=>{
    try{
        const userRating = await Rating.findAll({
            where:{
                userId: req.params.id
            }
        });
        res.send(userRating);
    }
    catch(err){
        next(err);
    };
});

app.get('/product/:id', async(req,res,next)=>{
    try{
        const productRating = await Rating.findAll({
            where: {
                productId: req.params.id
            }
        });
        res.send(productRating);
    }
    catch(err){
        next(err);
    };
});