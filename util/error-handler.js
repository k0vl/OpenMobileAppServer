// error handler
module.exports = function(err, req, res, next) {
  //console.log("err handler called");
  //pass to built-in error handler to close the connection when header is already sent 
  //https://expressjs.com/en/guide/error-handling.html
  if (res.headersSent) {
	return next(err)
  }
  
  console.error(err.stack);
  res.locals.status = "error";
  res.locals.message = err.message;
  res.locals.error = err;
  res.locals.data = undefined; //100x faster than delete, but does not cleanup hashmap
  res.status(err.status || 500).json(res.locals);
}