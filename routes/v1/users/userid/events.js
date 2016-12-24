var express = require('express');
var router = express.Router();

//listens to call to :user-id and attach object user to req

/* GET users listing. */
router.route('/')
	.get(function(req, res, next) {
	  var response = {};
	  
	  response.path = req.originalUrl;
	  
	  res.json(response);
	})
	.post(function(req, res, next) {
	  var response = {};
	  
	  response.path = req.originalUrl;
	  
	  res.json(response);
	})

module.exports = router;