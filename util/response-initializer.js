var express = require('express');
var router = express.Router();

router.use(function(req, res, next) {
	res.locals = {
		path : req.originalUrl,
		version : 'v1',
		status : "success",
		data : {}
	};
	next();
});

module.exports = router;