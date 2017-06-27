var express = require('express');
var router = express.Router();

var modify = require('./util/modify');
//listens to call to :user-id and attach object user to req

/* GET users listing. */
router.route('/')
.get(function(req, res, next){
	var queryString = "SELECT events.*, user_event.relationship \
	FROM events JOIN user_event \
	ON events.id = user_event.event_id \
	WHERE user_event.user_id = ?"
	modify.custom_query_all(req, res, next, queryString, [req.user.id]);
});


module.exports = router;