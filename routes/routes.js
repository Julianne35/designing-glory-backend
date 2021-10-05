const express = require("express");
const router = express.Router();
const emailController = require('../controllers/EmailController');

router.get('/', emailController.baseRoute); 
router.post('/get-email', emailController.createEmail);
router.get('/get-all', emailController.getAll);

module.exports = router;
