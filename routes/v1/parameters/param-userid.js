module.exports = function(router) {
		
	router.param('userid', function(req, res, next, id) {
	  // try to get the user details from the User model and attach it to the request object
	  console.log('param userid called');
	  req.user = {
		  id : id,
		  name: "bob"
	  }
	  next();
	});

}