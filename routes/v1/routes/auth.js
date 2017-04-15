var bcrypt = require('bcryptjs');
var res_login = require('./util/res-login');

var express = require('express');
var router = express.Router();


/* GET events listing. */
router.route('/')
.all(function (req, res, next) {
	
	var email = req.body.email || req.query.email;
	var password = req.body.password || req.query.password;
	
	if(!email)
		return next(new Error("no email address"));
	else if(!password)
		return next(new Error("no password"));
	
	
	var query = req.pool.query(
		'SELECT * FROM users WHERE email = ?', [email], 
		function on_sql_return(err, results, fields){
			
			if(err)
				return next(err);//handle sql error
			else if(results.length != 1)
				return next(new Error("user not found"));
			
			bcrypt.compare(password, results[0].hash, function(err, hashRes){
				if(err)
					return next(err);
				if(hashRes == true){
					res_login(results[0], req, res);
				}
				else{
					//failed login
					console.log("user " + email + " failed to log in.");
					return next(new Error("password incorrect"));
				}
			});
			
		}
	);
	
	console.log(query.sql);
});

module.exports = router;
