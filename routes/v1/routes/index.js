var express = require('express');
var router = express.Router();

/* GET home page. */
router.route('/')
	.all(function(req, res, next) {
	  var response = {};
	  
	  response.path = '/';
	  response.description = 'this is the index page';
	  response.api = "open-server";
	  response.version = 0.1;
	  
	  res.json(response);
	});

module.exports = router;