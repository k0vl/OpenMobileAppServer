var express = require('express');
var router = express.Router();

//listens to call to :user-id and attach req.user
require('./param_userid')(router);

router.route('/')
	.get(function(req, res, next) {
	  var response = {};
	  
	  response.path = req.originalUrl;
	  response.user = req.user.name;
	  
	  res.json(response);
	})
	.post(function(req, res, next) {
	  var response = {};
	  
	  response.path = req.originalUrl;
	  response.user = req.user.name;
	  
	  res.json(response);
	})

module.exports = router;