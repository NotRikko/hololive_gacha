const express = require('express');
const router = express.Router();
const user_controller = require('../controllers/userController');

router.get('/', user_controller.user);
router.post('/addUnits', user_controller.add_user_units_post);
router.post('/login', user_controller.user_login);
router.post('/signup', user_controller.user_signup);

module.exports = router;
