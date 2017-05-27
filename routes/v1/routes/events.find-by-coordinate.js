var express = require('express');
var router = express.Router();

var modify = require('./util/modify');

/* GET users listing. */
router.route('/')
.get(function(req, res, next){
	var queryString = 'SELECT * FROM events WHERE lat > ? AND lat < ? AND lng > ? AND lng < ?';
	var queryArray = [req.query.min_lat, req.query.max_lat, req.query.min_lng, req.query.max_lng];

	if(req.query.start_after){
		queryString += ' AND start_timestamp > ?';
		queryArray.push(req.query.start_after);
	}

	if(req.query.end_after){
		queryString += ' AND end_timestamp > ?';
		queryArray.push(req.query.end_after);
	}

	modify.custom_query_all(req, res, next, queryString, queryArray);
});

module.exports = router;