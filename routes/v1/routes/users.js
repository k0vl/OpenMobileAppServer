var bcrypt = require('bcryptjs');
var express = require('express');
var router = express.Router();

var modify = require('./util/modify');

/* GET users listing. */
router.route('/')
.post(function(req, res, next){
	
	var fb_id = req.body.fb_id;
	var email = req.body.email;
	var password = req.body.password;
	if(!fb_id){
		if(!email && !password)
			return next(new Error("no identification (provide either fb_id, or email and password"));
		else if(!email && password)
			return next(new Error("no email"));
		else if(email && !password)
			return next(new Error("no password"));
	}
	
	//precheck for duplicate
	//note: sql also checks, but its hard to parse sql error
	var qs = 'SELECT * FROM users WHERE ';
	var qo = [];
	if(fb_id){
		qs += 'fb_id = ?';
		qo.push(fb_id);
	}
	if(fb_id && email){
		qs += ' OR ';
	}
	if(email){
		qs += 'email = ?';
		qo.push(email);
	}
	var query = req.pool.query(qs, qo, function(err, results, fields) {
		if(err)
			return next(err);//handle sql error
		else if(results.length > 0)
			return next(new Error("user exists with same identification"));
		
		if(password){
			//generate salt and hash asyncly
			bcrypt.hash(req.body.password, 8, function(err, hash) {
				if(err) return next(err);
				modify.modify_user(req, res, next, 'INSERT INTO users SET ?, hash=' + req.pool.escape(hash));
			});
		} else if (fb_id) {
			modify.modify_user(req, res, next, 'INSERT INTO users SET ?');
		} else {
			return next(new Error("how did you get here??"));
		}
	});
});

module.exports = router;