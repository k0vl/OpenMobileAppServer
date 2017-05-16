var express = require('express');
var router = express.Router();

var modify = require('./util/modify');

router.route('/')
.post(function(req, res, next) {
	modify.custom_query_all(req, res, next, 'INSERT INTO user_invited SET ?', 
		{user_id:req.user.id, event_id:req.event.id});
})
.delete(function(req, res, next) {
	modify.custom_query_all(req, res, next, 'DELETE FROM user_invited WHERE user_id = ? AND event_id = ?', [req.user.id, req.event.id] );
})

module.exports = router;