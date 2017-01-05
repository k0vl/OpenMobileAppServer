var express = require('express');
var router = express.Router();

require('./parameters/param-eventid')(router);

require('./parameters/param-userid')(router);

//TODO: try automate this with fs module
router.use(
	'/', 
	require('./routes/index')
);

router.use(
	'/auth', 
	require('./routes/auth')
);

//user routes

router.use(
	'/users', 
	require('./routes/users')
);

router.use(
	'/users/:userid', 
	require('./routes/users.userid')
);

router.use(
	'/users/:userid/events', 
	require('./routes/users.userid.events')
);

router.use(
	'/users/:userid/events/:eventid', 
	require('./routes/users.userid.events.eventid')
);

//event routes

router.use(
	'/events', 
	require('./routes/events')
);

router.use(
	'/events/:eventid', 
	require('./routes/events.eventid')
);

router.use(
	'/events/:eventid/users', 
	require('./routes/events.eventid.users')
);

module.exports = router;