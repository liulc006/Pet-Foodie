const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');

app.use(express.json({ limit: '50mb' }));
app.engine('html', require('ejs').renderFile);
app.use(express.urlencoded({ limit: '50mb', extended: false }));
app.set('view engine', 'ejs');
app.use(cors());
const session = require('express-session');
app.use(session({ secret: 'thisissecretkey' }));

app.use('/dist', express.static(path.join(__dirname, '../dist')));
app.use('/static', express.static(path.join(__dirname, '../static')));

app.get('/', (req, res) =>
  res.render(path.join(__dirname, '../static/index.html'), {
    GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
  })
);

app.use('/api/auth', require('./api/auth'));
app.use('/api/orders', require('./api/orders'));
app.use('/github/callback', require('./api/authgithub'));
app.use('/api/auth/google', require('./api/authgoogle'));
app.use('/forgot-password', require('./api/forgotpswd'));
app.use('/reset-password', require('./api/resetpswd'));
app.use('/api/products', require('./api/products'));
app.use('/api/users', require('./api/users'));
app.use('/api/ratings', require('./api/ratings'));

app.use((req, res, next) => {
  const err = Error('page not found');
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send(err);
});
module.exports = app;
