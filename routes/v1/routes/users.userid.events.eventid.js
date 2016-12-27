var express = require('express');
var router = express.Router();

router.route('/')
	.get(function(req, res, next) {
	  var response = {};
	  
	  response.path = req.originalUrl;
	  response.message = "for testing only";
	  response.event = req.event.name;
	  
	  res.json(response);
	})
	.delete(function(req, res, next) {
	  var response = {};
	  
	  response.path = req.originalUrl;
	  response.message = "user will be disassociated with the event";
	  response.event = req.event.name;
	  
	  res.json(response);
	})

module.exports = router;