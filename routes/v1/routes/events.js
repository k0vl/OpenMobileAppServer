var express = require('express');
var router = express.Router();

var modify_event = require('./util/modify').modify_event;

/* GET events listing. */
router.route('/')
	.post(function(req, res, next){
		//TODO:add the user as host
		
		modify_event(req, res, next, 'INSERT INTO events SET ?');
	})
	.get(function(req, res, next){
		res.locals.data.description = "testing only; this should not be accessed during production";
		res.json(res.locals);
	});

module.exports = router;