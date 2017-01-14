var bcrypt = require('bcryptjs');

var express = require('express');
var router = express.Router();

function insert_user(req, res, next, pw_hash){
	//TODO:generalize the post params
	//TODO:automate the query creation with reflection or something
	var queryObject = {
		last_name 	: req.body.last_name,
		first_name 	: req.body.first_name,
		email 		: req.body.email,
		college 	: req.body.college,
		gender		: req.body.gender,
		birthday	: req.body.birthday,//sanitize birthday as date
		hash		: pw_hash
	};
	
	var query = req.pool.query('INSERT INTO users SET ?', queryObject, function(err, results, fields) {
		if(err)
			return next(err);
		res.locals.data = results;
		res.json(res.locals);
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
	
	//precheck for duplicate
	//note: sql also checks, but its hard to parse sql error
	var query = req.pool.query(
		'SELECT * FROM users WHERE email = ?', req.body.email, function(err, results, fields) {
		if(err)
			return next(err);//handle sql error
		else if(results.length > 0)
			return next(new Error("user exists with same email"));
	});
	
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