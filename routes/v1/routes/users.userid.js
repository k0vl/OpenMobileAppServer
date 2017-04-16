var express = require('express');
var router = express.Router();

var modify = require('./util/modify');

router.route('/')
.get(function(req, res, next) {
	modify.custom_query_1_row(req, res, next, 'SELECT * FROM users WHERE id =' + req.pool.escape(req.user.id));
})
.post(function(req, res, next) {
	modify.modify_user(req, res, next, 'UPDATE users SET ? WHERE id=' + req.pool.escape(req.user.id));
})

module.exports = router;