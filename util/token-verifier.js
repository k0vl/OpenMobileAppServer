var jwt = require('jsonwebtoken');
const url = require('url'); 

var express = require('express');
var router = express.Router(); 

// route middleware to verify a token

//NOTE:always enter lowercase!!!!!!!
var publicPages = [
	"/v1",//test page
	"/v1/v7mown2dj6bf",//404 test page
	"/v1/auth",
	"/v1/fbauth",
	"/v1/checkfbtoken",
	"/v1/users"//temp
];

router.use(function(req, res, next) {
	//bypass the auth if it is not private
	if(publicPages.indexOf(url.parse(req.originalUrl).pathname.toLowerCase()) !== -1){
		return next();
	}
	
	var token = req.body.access_token || req.query.access_token || req.headers['x-access-token'];

	if (token) {
		jwt.verify(token, req.app.get('jwt-secret'), function(err, decoded) {      
			if (err){
				return next(new Error("Failed to authenticate token"));
			}
			else {
				req.jwt = decoded;    
				next();
			}
		});
	} 
	else{
		return next(new Error("No token provided"));
	}
});

module.exports = router;