var express = require('express');
var router = express.Router();

var modify = require('./util/modify');

/* GET users listing. */
router.route('/')
.get(function(req, res, next){
	modify.custom_query_all(req, res, next, 'SELECT * FROM events WHERE name LIKE ?',
	['%'+req.query.keyword+'%']);
});

module.exports = router;