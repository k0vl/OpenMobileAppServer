//error logger
module.exports = function(err, req, res, next) {
	//console.log("err log called");
	//logs error message
	console.log( err.name + ": " + err.message );
	//logs sql error code
	//https://github.com/mysqljs/mysql#error-handling
	if(err.code){
		console.log(err.code);
	}
	next(err);
}