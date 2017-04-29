var express = require('express');
var router = express.Router();

require('./parameters/param-eventid')(router);

require('./parameters/param-userid')(router);

require('./parameters/param-userid2')(router);

//TODO: try automate this with fs module
router.use(
	'/', 
	require('./routes/index')
);

router.use(
	'/checkFBtoken', 
	require('./routes/checkFBtoken')
);

router.use(
	'/auth', 
	require('./routes/auth')
);

router.use(
	'/FBauth', 
	require('./routes/FBauth')
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
	'/users/:userid/profile-photo', 
	require('./routes/users.userid.profile-photo')
);

router.use(
	'/users/:userid/events', 
	require('./routes/users.userid.events')
);

//following routes

router.use(
	'/users/:userid/followings', 
	require('./routes/users.userid.followings')
);

router.use(
	'/users/:userid/followers', 
	require('./routes/users.userid.followers')
);

router.use(
	'/users/:userid/followings/:userid2', 
	require('./routes/users.userid.followings.userid')
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

router.use(
	'/events/:eventid/users/:userid', 
	require('./routes/events.eventid.users.userid')
);

module.exports = router;