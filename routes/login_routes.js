var express = require('express');
var config = require('../devflow-service/config');
var client = require('../devflow-service/client');
var router = express.Router();

router.post('/api/login', function(req, res, next) {
	client.post(req, res, config.LOGIN_ROUTE, req.body, function(req, res, err, response) {
		console.log(req.session);

		if (err) {
			console.error(err);
			res.send(500);
		} else {
			res.status(response.statusCode);
		} if (response.statusCode >= 400) {
			res.send();
		} else {
			console.log(response);
			res.send(response.body);
		}
	});
});

module.exports = router;
