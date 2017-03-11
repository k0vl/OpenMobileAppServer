var bcrypt = require('bcryptjs');
var express = require('express');
var router = express.Router();

var modify_user = require('./util/modify').modify_user;

/* GET users listing. */
router.route('/')
.post(function(req, res, next){
	
	if(!req.body.email)
		return next(new Error("no email address"));
	else if(!req.body.password)
		return next(new Error("no password"));
	
	//precheck for duplicate
	//note: sql also checks, but its hard to parse sql error
	var query = req.pool.query('SELECT * FROM users WHERE email = ?', [req.body.email], function(err, results, fields) {
		if(err)
			return next(err);//handle sql error
		else if(results.length > 0)
			return next(new Error("user exists with same email"));
		
		//generate salt and hash asyncly
		bcrypt.hash(req.body.password, 8, function(err, hash) {
			if(err)
				return next(err);
			modify_user(req, res, next, 'INSERT INTO users SET ?, hash=' + req.pool.escape(hash));
		});
	});
})
.get(function(req, res, next){
	res.locals.data.message = "testing only; this should not be accessed during production";
	return res.json(res.locals);
});

module.exports = router;