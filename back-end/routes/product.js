const express = require('express');
const router = express.Router();
const productController = require("../controllers").product;
const checkAuth = require('./user').checkAuth;
const checkNotAuth = require('./user').checkNotAuth;


router.post('/addProduct', checkNotAuth, productController.addProduct);
router.get('/getAllProducts', checkNotAuth, productController.getAllProducts);
router.put('/claimProduct/:userId/:id', checkNotAuth, productController.claimProduct)
router.put('/unclaimProduct/:userId/:id', checkNotAuth, productController.unclaimProduct);
router.delete('/deleteProduct/:id', checkNotAuth, productController.deleteProduct);

module.exports = router;