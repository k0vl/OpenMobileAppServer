var express = require('express');
var router = express.Router();

var modify = require('./util/modify');

router.route('/')
.post(function(req, res, next) {
	modify.custom_query_all(req, res, next, 'INSERT INTO user_event SET ? ON DUPLICATE KEY UPDATE relationship=VALUES(relationship)', 
		{user_id:req.user.id, event_id:req.event.id, relationship:req.body.relationship});
})
.delete(function(req, res, next) {
	modify.custom_query_all(req, res, next, 'DELETE FROM user_event WHERE'
							+ ' user_id =' 		+ req.pool.escape(req.user.id)
							+ ' AND event_id =' + req.pool.escape(req.event.id));
})

module.exports = router;