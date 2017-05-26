var express = require('express');
var router = express.Router();

var modify = require('./util/modify');

/* GET users listing. */
router.route('/')
.get(function(req, res, next){
	modify.custom_query_all(req, res, next, 'SELECT * FROM events WHERE lat > ? AND lat < ? AND lng > ? AND lng < ?',
	[req.query.min_lat, req.query.max_lat, req.query.min_lng, req.query.max_lng]);
});

module.exports = router;