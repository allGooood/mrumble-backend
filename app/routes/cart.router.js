const express = require('express');
const router = express.Router();
const controller = require('../controller/cart.controller');

router.post('/', controller.addToCart);
router.get('/:user_id', controller.getCartList);
router.put('/', controller.updateCart);

module.exports = router;