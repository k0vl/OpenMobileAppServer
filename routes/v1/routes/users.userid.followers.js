var express = require('express');
var router = express.Router();

var modify = require('./util/modify');

/* GET users listing. */
router.route('/')
.get(function(req, res, next){
	modify.custom_query_1_col(req, res, next, 'SELECT user1_id FROM following WHERE user2_id = ?' , [req.user.id], "user1_id");
});

module.exports = router;