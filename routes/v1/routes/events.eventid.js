var express = require('express');
var router = express.Router();

router.route('/')
	.get(function(req, res, next) {
	  var response = {};
	  
	  response.path = req.originalUrl;
	  response.message = "event info will be returned";
	  response.event = req.event.name;
	  
	  res.json(response);
	})
	.delete(function(req, res, next) {
	  var response = {};
	  
	  response.path = req.originalUrl;
	  response.message = "event will be deleted";
	  response.event = req.event.name;
	  
	  res.json(response);
	})

module.exports = router;