//'INSERT INTO users SET ?'

async = require("async");

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

module.exports.custom_query_1_row_with_info = function (req, res, next, queryString, queryObject) {
	var query = req.pool.query(queryString, queryObject, function(err, results, fields) {
		if(err) {return next(err);}
		else if(results.length != 1)
			return next(new Error("not found"));
		res.locals.data = results[0];

		var p1 = function(callback) {
			if(results[0].sender_id !== null){
				req.pool.query('SELECT * FROM users WHERE id = ?', [results[0].sender_id], function(err, results, fields) {
					if(err !== null){callback(err);}
					else if (results.length != 1){callback(new Error("sender not found"));}
					else{callback(null, results[0]);}
				})
			} else {
				callback(null, null);
			}
		}

		var p2 = function(callback) {
			if(results[0].event_id !== null){
				req.pool.query('SELECT * FROM events WHERE id = ?', [results[0].event_id], function(err, results, fields) {
					if(err !== null){callback(err);}
					else if (results.length != 1){callback(new Error("event not found"));}
					else{callback(null, results[0]);}
				})
			} else {
				callback(null, null);
			}
		}

		async.parallel([p1,p2], function(err, results) {
			if(err){
				next(err);
				return;
			}
			if(results[0] !== null){
				res.locals.data.sender = results[0];
			}
			if(results[1] !== null){
				res.locals.data.event = results[1];
			}
			res.json(res.locals);
		});
	});
	console.log(query.sql);
}

module.exports.custom_query_by_array = function (req, res, next, queryString, fields){
	var queryObject = {};
	fields.forEach(function(field){
		if(req.body[field]) queryObject[field] = req.body[field];
	});
	module.exports.custom_query_all(req, res, next, queryString, queryObject);
}

module.exports.modify_user = function (req, res, next, queryString){
	var userFields = ["last_name", "first_name", "email", "college", "gender", "birthday", "fb_token", "fb_id"];
	module.exports.custom_query_by_array(req, res, next, queryString, userFields);
}

module.exports.modify_event = function (req, res, next, queryString){
	var eventFields = ["name", "emoji", "price", "address", "city", "state", "lat", "lng", "is_public",
						"start_timestamp", "end_timestamp", "min_age", "max_age"];
	module.exports.custom_query_by_array(req, res, next, queryString, eventFields);
}