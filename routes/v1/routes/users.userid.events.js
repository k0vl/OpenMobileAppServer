var express = require('express');
var router = express.Router();

var modify = require('./util/modify').modify;
//listens to call to :user-id and attach object user to req

/* GET users listing. */
router.route('/')
.get(function(req, res, next) {
	modify(req, res, next, 'SELECT * FROM user_event WHERE user_id = ?' , [req.user.id]);
})

module.exports = router;