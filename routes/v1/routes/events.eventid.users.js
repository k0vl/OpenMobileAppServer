var express = require('express');
var router = express.Router();

/* GET users listing. */
router.route('/')
.get(function(req, res, next){
	res.locals.data.description = 'stub';
	res.json(res.locals);
});

module.exports = router;