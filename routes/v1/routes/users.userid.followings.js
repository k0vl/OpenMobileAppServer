var express = require('express');
var router = express.Router();

var modify = require('./util/modify');

/* GET users listing. */
router.route('/')
.get(function(req, res, next){
	//'SELECT user2_id FROM following WHERE user1_id = ?'  , "user2_id"
	modify.custom_query_all(req, res, next,  'SELECT * FROM users WHERE id IN (SELECT user2_id FROM following WHERE user1_id = ? )', [req.user.id]);
});

module.exports = router;