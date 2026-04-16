const authInterfaces = require('../interfaces/auth-interfaces');
const express = require('express');
const router = express.Router();

router.post('/login', authInterfaces.login);

module.exports = router;
