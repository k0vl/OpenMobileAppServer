module.exports = function(router) {
		
	router.param('eventid', function(req, res, next, id) {
	  // try to get the user details from the event model and attach it to the request object
	  console.log('param eventid called');
	  req.event = {
		  id : id
	  }
	  next();
	});

}