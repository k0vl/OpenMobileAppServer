var express = require('express');
var router = express.Router();

/* GET events listing. */
router.route('/')
	.post(function(req, res, next){
		//TODO:generalize the post params
		//TODO:automate the query creation with reflection or something
		var queryObject = {
			name 	: req.body.name,
			price 	: req.body.price,
			address : req.body.address,
			city 	: req.body.city,
			state	: req.body.state
		};
		
		var query = req.pool.query(
			'INSERT INTO events SET ?', queryObject, function(err, results, fields) {
			if(err)
				return next(err);
			res.locals.data = results;
			res.json(res.locals);
		});
		
		console.log(query.sql);
	})
	.get(function(req, res, next){
		res.locals.data.description = "testing only; this should not be accessed during production";
		res.json(res.locals);
	});

module.exports = router;