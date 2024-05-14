const express = require('express');
const router = express.Router();
const banner_controller = require('../controllers/bannerController');

router.get('/banners', banner_controller.banner_list);

module.exports = router;