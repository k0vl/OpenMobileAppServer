var express = require('express');
var router = express.Router();

var modify = require('./util/modify');

/* GET users listing. */
router.route('/')
.post(function(req, res, next) {
	//use custom_query_by_array to prevent null insertion problems
	modify.custom_query_by_array(req, res, next, 'INSERT INTO notification SET user_id=' + req.pool.escape(req.user.id) + ', ?', ["message","type"]);
});

module.exports = router;