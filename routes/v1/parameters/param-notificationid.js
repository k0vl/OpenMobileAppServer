module.exports = function(router) {
		
	router.param('notificationid', function(req, res, next, id) {
	  // try to get the user details from the User model and attach it to the request object
	  req.notification = {
		  id : id
	  }
	  next();
	});

}