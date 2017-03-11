var express = require('express');
var router = express.Router();

var modify = require('./util/modify').modify;
var modify_event = require('./util/modify').modify_event;

router.route('/')
.get(function(req, res, next) {
	//TODO: refactor with modify
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
	modify(req, res, next, 'DELETE FROM events WHERE id =' + req.pool.escape(req.event.id));
})
.post(function(req, res, next) {
	modify_event(req, res, next, 'UPDATE events SET ? WHERE id=' + req.pool.escape(req.event.id));
})

module.exports = router;