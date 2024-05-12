const express = require('express');
const router = express.Router();
const banner_controller = require('../controllers/bannerController');

router.get('/banners', banner_controller.banner_list);
router.get('/units', banner_controller.unit_list);

module.exports = router;