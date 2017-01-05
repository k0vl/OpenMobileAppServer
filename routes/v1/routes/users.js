var bcrypt = require('bcryptjs');

var express = require('express');
var router = express.Router();

function insert_user(req, res, next, pw_hash){
	//TODO:generalize the post params
	//TODO:automate the query creation with reflection or something
	var query_object = {
		last_name 	: req.body.last_name,
		first_name 	: req.body.first_name,
		email 		: req.body.email,
		college 	: req.body.college,
		hash		: pw_hash
	};
	
	var query = req.pool.query('INSERT INTO users SET ?', query_object, function(err, results, fields) {
		if(err)
			return next(err);
		res.json(results);
	});
	
	console.log(query.sql);
}

/* GET users listing. */
router.route('/')
.post(function(req, res, next){
	
	if(!req.body.email)
		return next(new Error("no email address"));
	else if(!req.body.password)
		return next(new Error("no password"));
	
	//generate salt and hash asyncly
	bcrypt.hash(req.body.password, 8, function(err, hash) {
		if(err)
			return next(err);
		insert_user(req, res, next, hash);
	});
})
.get(function(req, res, next){
	res.locals.data.message = "testing only; this should not be accessed during production";
	return res.json(res.locals);
});

module.exports = router;