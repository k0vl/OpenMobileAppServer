var express = require('express');
var router = express.Router();

/* GET users listing. */
router.route('/')
	.get(function(req, res, next){
		var response = {};

		response.path = req.originalUrl;
		response.message = "return a list of users attending this party";

		res.json(response);
	});

module.exports = router;