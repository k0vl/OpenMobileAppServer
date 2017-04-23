var express = require('express');
var router = express.Router();

var modify = require('./util/modify');

/* GET users listing. */
router.route('/')
.get(function(req, res, next){
	//'SELECT * FROM user_event WHERE event_id = ?'
	//'SELECT * FROM users WHERE id IN (SELECT user_id FROM user_event WHERE event_id = ? )'
	var queryString = "SELECT users.*, user_event.relationship \
	FROM users JOIN user_event \
	ON users.id = user_event.user_id \
	WHERE user_event.event_id = ?"
	modify.custom_query_all(req, res, next, queryString, [req.event.id]);
});

module.exports = router;