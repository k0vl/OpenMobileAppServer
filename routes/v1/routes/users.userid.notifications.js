var express = require('express');
var router = express.Router();

var modify = require('./util/modify');

/* GET users listing. */
router.route('/')
.post(function(req, res, next) {
	//use custom_query_by_array to prevent null insertion problems
	modify.custom_query_by_array(req, res, next, 'INSERT INTO notification SET user_id=' + req.pool.escape(req.user.id) + ', ?', ["message","type"]);
})
.get(function(req, res, next){
	//'SELECT user1_id FROM following WHERE user2_id = ?'  , "user1_id"
	modify.custom_query_all(req, res, next,  'SELECT * FROM notification WHERE user_id = ?', [req.user.id]);
})

module.exports = router;