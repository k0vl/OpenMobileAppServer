var express = require('express');
var router = express.Router();

require('./parameters/param-eventid')(router);

require('./parameters/param-userid')(router);

require('./parameters/param-userid2')(router);

require('./parameters/param-notificationid')(router);


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
	'/users/find-by-keyword', 
	require('./routes/users.find-by-keyword')
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
	'/users/:userid/bestfriends', 
	require('./routes/users.userid.bestfriends')
);

router.use(
	'/users/:userid/notifications', 
	require('./routes/users.userid.notifications')
);

router.use(
	'/users/:userid/notifications/:notificationid', 
	require('./routes/users.userid.notifications.notificationid')
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
	'/events/find-by-coordinate', 
	require('./routes/events.find-by-coordinate')
);

router.use(
	'/events/find-by-keyword', 
	require('./routes/events.find-by-keyword')
);

router.use(
	'/events/:eventid', 
	require('./routes/events.eventid')
);

//event and user

router.use(
	'/events/:eventid/users', 
	require('./routes/events.eventid.users')
);

router.use(
	'/events/:eventid/users/:userid', 
	require('./routes/events.eventid.users.userid')
);

router.use(
	'/users/:userid/events', 
	require('./routes/users.userid.events')
);

//invites

router.use(
	'/events/:eventid/invites', 
	require('./routes/events.eventid.invites')
);

router.use(
	'/events/:eventid/invites/:userid', 
	require('./routes/events.eventid.invites.userid')
);

router.use(
	'/users/:userid/invites', 
	require('./routes/users.userid.invites')
);

module.exports = router;