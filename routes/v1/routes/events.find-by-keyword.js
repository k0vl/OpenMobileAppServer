var express = require('express');
var router = express.Router();

var modify = require('./util/modify');

/* GET users listing. */
router.route('/')
.get(function(req, res, next){
	var queryString = 'SELECT * FROM events WHERE name LIKE ?';
	var queryArray = ['%'+req.query.keyword+'%'];

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