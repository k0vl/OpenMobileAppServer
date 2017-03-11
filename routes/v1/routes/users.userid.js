var express = require('express');
var router = express.Router();

var modify_user = require('./util/modify').modify_user;
var find = require('./util/modify').find;

router.route('/')
.get(function(req, res, next) {
	find(req, res, next, 'SELECT * FROM users WHERE id =' + req.pool.escape(req.user.id));
})
.post(function(req, res, next) {
	modify_user(req, res, next, 'UPDATE users SET ? WHERE id=' + req.pool.escape(req.user.id));
})

module.exports = router;