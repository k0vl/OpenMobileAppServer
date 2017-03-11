var express = require('express');
var router = express.Router();

var modify = require('./util/modify').modify;

/* GET users listing. */
router.route('/')
.get(function(req, res, next){
	modify(req, res, next, 'SELECT * FROM user_event WHERE event_id = ?' , [req.event.id]);
});

module.exports = router;