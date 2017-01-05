var express = require('express');
var router = express.Router();

/* GET home page. */
router.route('/')
.all(function(req, res, next) {
	res.locals.data.description = 'this is the index page';
	res.json(res.locals);
});

module.exports = router;