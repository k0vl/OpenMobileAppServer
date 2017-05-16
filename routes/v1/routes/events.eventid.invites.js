var express = require('express');
var router = express.Router();

var modify = require('./util/modify');

/* GET users listing. */
router.route('/')
.get(function(req, res, next) {
	modify.custom_query_all(req, res, next, 'SELECT * FROM users WHERE id IN (SELECT user_id FROM user_invited WHERE event_id = ?)' , [req.event.id]);
})

module.exports = router;