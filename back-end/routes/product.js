const express = require('express');
const router = express.Router();
const productController = require("../controllers").product;
const checkAuth = require('./user').checkAuth;
const checkNotAuth = require('./user').checkNotAuth;


router.post('/addProduct', checkNotAuth, productController.addProduct);

module.exports = router;