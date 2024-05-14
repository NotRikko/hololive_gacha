const express = require('express');
const router = express.Router();
const unit_controller = require('../controllers/unitController');

router.get('/', unit_controller.unit_list);
router.get('/common', unit_controller.common_unit_list);
router.get('/epic', unit_controller.epic_unit_list);
router.get('/legendary', unit_controller.legendary_unit_list);

module.exports = router;