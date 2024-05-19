const express = require('express');
const router = express.Router();
const verifyToken = require('./middleware/auth.js')

const homeController = require('./controllers/homeController')
const loginController = require('./controllers/login')
const siteController = require('./controllers/siteController.js')

router.get('/', homeController.getIndex);
router.post('/login', loginController.postLogin)
router.get('/restrito', verifyToken, siteController.getIndex)

module.exports = router;