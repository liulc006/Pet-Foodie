const express = require('express');
const app = express.Router();
const { User } = require('../db');

module.exports = app;

app.get('/', async(req, res, next)=> {
  try {
    const {token, id }= await User.authgithub(req.query.code);
    // res.send(token)
    res.send(`
        <html>
            <body>
                <script>
                    window.localStorage.setItem('token', '${token}');
                    window.document.location = '/#/';
                </script>
            </body>
        </html>
    `)
  }
  catch(ex){
    next(ex);
  }
});
