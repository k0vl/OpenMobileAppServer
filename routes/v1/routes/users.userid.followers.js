var express = require('express');
var router = express.Router();

var modify = require('./util/modify').modify;

/* GET users listing. */
router.route('/')
.get(function(req, res, next){
	modify(req, res, next, 'SELECT * FROM following WHERE user2_id = ?' , [req.user.id]);
});

module.exports = router;