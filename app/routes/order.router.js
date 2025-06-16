const express = require('express');
const router = express.Router();
const controller = require('../controller/order.controller');

router.post('/', controller.createOrder);

module.exports = router;