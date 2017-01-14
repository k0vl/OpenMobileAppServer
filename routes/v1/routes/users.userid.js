var express = require('express');
var router = express.Router();

router.route('/')
.get(function(req, res, next) {
	var query = req.pool.query(
		'SELECT * FROM users WHERE id = ?', req.user.id, function(err, results, fields) {
		if(err)
			return next(err);//handle sql error
		else if(results.length != 1)
			return next(new Error("event not found"));
		
		res.locals.data = results[0];
		res.json(res.locals);
	});
	
	console.log(query.sql);
})
.post(function(req, res, next) {
	res.locals.data.description = "stub";
	res.json(res.locals);
})

module.exports = router;