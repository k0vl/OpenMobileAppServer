//'INSERT INTO users SET ?'

module.exports.custom_query_all = function (req, res, next, queryString, queryObject){
	//TODO:generalize the post params
	//TODO:automate the query creation with reflection or something
	var query = req.pool.query(queryString, queryObject, function(err, results, fields) {
		if(err) {return next(err);}
		res.locals.data = results;
		res.json(res.locals);
	});
	console.log(query.sql);
}

module.exports.custom_query_1_row = function (req, res, next, queryString, queryObject) {
	var query = req.pool.query(queryString, queryObject, function(err, results, fields) {
		if(err) {return next(err);}
		else if(results.length != 1)
			return next(new Error("not found"));
		res.locals.data = results[0];
		res.json(res.locals);
	});
	console.log(query.sql);
}

module.exports.custom_query_1_col = function(req, res, next, queryString, queryObject, columnName) {
	var query = req.pool.query(queryString, queryObject, function(err, results, fields) {
		if(err) {return next(err);}
		res.locals.data = results.map( function(item) {return item[columnName];} );
		res.json(res.locals);
	});
	console.log(query.sql);
}

module.exports.modify_user = function (req, res, next, queryString){
	var userFields = ["last_name", "first_name", "email", "college", "gender", "birthday", "fb_token", "fb_id"];
	var queryObject = {};
	userFields.forEach(function(field){
		if(req.body[field]) queryObject[field] = req.body[field];
	});
	module.exports.custom_query_all(req, res, next, queryString, queryObject);
}

module.exports.modify_event = function (req, res, next, queryString){
	var eventFields = ["name", "emoji", "price", "address", "city", "state", "lat", "lng", "is_public",
						"start_date", "start_time", "end_date", "end_time"];
	var queryObject = {};
	eventFields.forEach(function(field){
		if(req.body[field]) queryObject[field] = req.body[field];
	});
	module.exports.custom_query_all(req, res, next, queryString, queryObject);
}