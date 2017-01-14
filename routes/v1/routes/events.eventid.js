var express = require('express');
var router = express.Router();

router.route('/')
.get(function(req, res, next) {
	var query = req.pool.query(
		'SELECT * FROM events WHERE id = ?', req.event.id, function(err, results, fields) {
		if(err)
			return next(err);//handle sql error
		else if(results.length != 1)
			return next(new Error("event not found"));
		
		res.locals.data = results[0];
		res.json(res.locals);
	});
	
	console.log(query.sql);
})
.delete(function(req, res, next) {//TODO: varify the user owns the event
	var query = req.pool.query(
		'DELETE FROM events WHERE id = ?', req.event.id, function(err, results, fields) {
		if(err)
			return next(err);//handle sql error
		
		res.locals.data = results;
		res.json(res.locals);
	});
	
	console.log(query.sql);
})

module.exports = router;