const express = require('express');
const router = express.Router();
const cookieController = require('../controller/cookie.controller');

router.get('/', cookieController.getCookies);

module.exports = router;