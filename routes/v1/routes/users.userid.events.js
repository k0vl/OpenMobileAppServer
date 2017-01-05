var express = require('express');
var router = express.Router();

//listens to call to :user-id and attach object user to req

/* GET users listing. */
router.route('/')
.get(function(req, res, next) {
	res.locals.data.description = 'stub';
	res.json(res.locals);
})
.post(function(req, res, next) {
	res.locals.data.description = 'stub';
	res.json(res.locals);
})

module.exports = router;