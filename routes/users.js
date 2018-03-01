var express = require('express');
var config = require('../devflow-service/config');
var client = require('../devflow-service/client');
var router = express.Router();

/* GET users listing. */
router.get('/api/users', function(req, res, next) {
	client.get(req, res, config.USERS_ROUTE);
});

module.exports = router;
