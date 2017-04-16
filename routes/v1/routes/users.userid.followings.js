var express = require('express');
var router = express.Router();

var modify = require('./util/modify');

/* GET users listing. */
router.route('/')
.get(function(req, res, next){
	modify.custom_query_1_col(req, res, next, 'SELECT user2_id FROM following WHERE user1_id = ?' , [req.user.id], "user2_id");
});

module.exports = router;