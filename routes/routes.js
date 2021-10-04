const express = require("express");
const router = express.Router();
const emailController = require('../controllers/EmailController');

router.get('/', emailController.baseRoute); 
router.get('/get-email', emailController.displayEmail);

module.exports = router;
