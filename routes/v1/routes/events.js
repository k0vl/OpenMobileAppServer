var express = require('express');
var router = express.Router();

/* GET events listing. */
router.route('/')
	.post(function(req, res, next){
		var response = {};

		response.path = req.originalUrl;
		
		//TODO:generalize the post params
		//TODO:automate the query creation with reflection or something
		var query_object = {
			name 	: req.body.name,
			price 	: req.body.price,
			address : req.body.address,
			city 	: req.body.city,
			state	: req.body.state
		};
		
		var query = req.pool.query(
			'INSERT INTO events SET ?', query_object, function(err, results, fields) {
			if(err){console.log("err: " + err);}
			res.json(results);
		});
		
		console.log(query.sql);
	})
	.get(function(req, res, next){
		var response = {};

		response.path = req.originalUrl;
		response.message = "testing only; this should not be accessed during production";

		res.json(response);
	});

module.exports = router;