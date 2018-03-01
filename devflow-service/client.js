var config = require('../devflow-service/config');
var agent = require('superagent');

var onFinish = function(req, res, err, response, callback) {
	copyHeaders(res, response);
	if (callback) {
		callback(req, res, err, response);
	} else {
		if (err) {
			console.error(err);
			res.send(500);
		} else {
			res.status(response.statusCode);
			if (response.statusCode >= 400) {
				res.send();            
			} else {
				console.log(response);
				res.send(response.body);
			}
		}
	}
};

var cookie = function(req) {
	return req.headers.cookie ? req.headers.cookie : '';
};

var copyHeaders = function(res, response) {
	for (var key in response.headers) {
		if (response.headers.hasOwnProperty(key)) {
			res.setHeader(key, response.headers[key]);
		}
	}
};

var client = {
	post: function(req, res, path, data, callback) {
		agent.post(config.BASE_URL + path)
			.send(data)
			.set('cookie', cookie(req))
			.end(function(err, response) {
				onFinish(req, res, err, response);
			});
	},

	get: function(req, res, path, callback) {
		agent.get(config.BASE_URL + path)
			.set('cookie', cookie(req))
			.end(function(err, response) {
				onFinish(req, res, err, response);
			});
	}
};

module.exports = client;
