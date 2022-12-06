const express = require('express');
const { User } = require('../db');
const app = express.Router();
const nodemailer = require('nodemailer');

module.exports = app;

app.post('/', async(req, res, next) => {
    const {email} = req.body; //get the email from the url
    try{
        const resetinfo = await User.fetchresetURL(email) //get the data from DB
        // console.log(resetinfo.link)
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'imlifewilling@gmail.com',
                pass: 'ccynrzxgvlktwpdm'
            }
        });
        
        var mailOptions = {
        from: 'imlifewilling@gmail.com',
        to: email,
        subject: 'Password Reset',
        html: `<h4>Please Reset your password!</h4> <a href=${resetinfo.link}><button>Reset your password</button></a>`
        };
        
        transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
        });
        res.send(resetinfo)
    }catch(ex){
        next(ex)
    }
    
});