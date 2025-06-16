const express = require('express');
const router = express.Router();
const controller = require('../controller/user.controller');

router.post('/', controller.addUser);
router.get('/:email', controller.getUser);

module.exports = router;