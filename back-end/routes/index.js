const express = require('express');
const router = express.Router();
const otherRouter = require('./other');
const userRouter = require('./user');

router.use('/extras', otherRouter);
router.use('/api', userRouter);

module.exports = router;