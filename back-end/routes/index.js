const express = require('express');
const router = express.Router();
const otherRouter = require('./other');
const userRouter = require('./user').router;
const productRouter = require('./product');

router.use('/extras', otherRouter);
router.use('/api', userRouter);
router.use('/api', productRouter);

module.exports = router;