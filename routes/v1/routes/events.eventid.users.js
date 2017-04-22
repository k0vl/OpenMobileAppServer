var express = require('express');
var router = express.Router();

var modify = require('./util/modify');

/* GET users listing. */
router.route('/')
.get(function(req, res, next){
	//'SELECT * FROM user_event WHERE event_id = ?'
	modify.custom_query_all(req, res, next, 'SELECT * FROM users WHERE id IN (SELECT user_id FROM user_event WHERE event_id = ? )', [req.event.id]);
});

module.exports = router;