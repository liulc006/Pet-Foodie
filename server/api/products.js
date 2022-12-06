const express = require("express");
const app = express.Router();
const { Product, Category } = require("../db");

module.exports = app;

app.get("/", async (req, res, next) => {
  try {
    const products = await Product.findAll();
    res.send(products);
  } catch (error) {
    next(error);
  }
});
