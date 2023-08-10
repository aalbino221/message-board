const express = require('express');
const router = express.Router();
const message_controller = require('../control/messageController');

/* GET home page. */
router.get('/', message_controller.index);

router.get('/new', message_controller.new_get);

router.post('/new', message_controller.new_post);

module.exports = router;
