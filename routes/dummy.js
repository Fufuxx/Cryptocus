const express = require('express');
const router = express.Router();

const dummy_controller = require('../controllers/dummy_controller.js');

router.get('/list', dummy_controller.list);
router.post('/create', dummy_controller.create);

module.exports = router;