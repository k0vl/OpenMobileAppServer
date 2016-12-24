var express = require('express');
var router = express.Router();

//TODO: try automate this with fs module
router.use(
	'/', 
	require('./index')
);

router.use(
	'/users', 
	require('./users')
);

router.use(
	'/users/:userid', 
	require('./users/userid')
);

router.use(
	'/users/:userid/events', 
	require('./users/userid/events')
);

module.exports = router;