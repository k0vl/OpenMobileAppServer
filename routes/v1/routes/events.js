var express = require('express');
var router = express.Router();

/* GET events listing. */
router.route('/')
	.post(function(req, res, next){
		//TODO:generalize the post params
		//TODO:automate the query creation with reflection or something
		var queryObject = {
			name		: req.body.name,
			price		: req.body.price,
			address		: req.body.address,
			address2	: req.body.address2,
			city 		: req.body.city,
			state		: req.body.state,
			is_public	: bool,
			start_date	: req.body.start_date,
			start_time	: req.body.start_time,
			end_date	: req.body.end_date,
			end_time	: req.body.end_time
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