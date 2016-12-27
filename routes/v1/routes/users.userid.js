var express = require('express');
var router = express.Router();

router.route('/')
	.get(function(req, res, next) {
	  var response = {};
	  
	  response.path = req.originalUrl;
	  response.message = "get user information";
	  response.user = req.user.name;
	  
	  res.json(response);
	})
	.post(function(req, res, next) {
	  var response = {};
	  
	  response.path = req.originalUrl;
	  response.message = "update user information";
	  response.user = req.user.name;
	  
	  res.json(response);
	})

module.exports = router;