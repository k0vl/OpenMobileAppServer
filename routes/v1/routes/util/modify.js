//'INSERT INTO users SET ?'

function modify_and_respond(req, res, next, queryString, queryObject){
	//TODO:generalize the post params
	//TODO:automate the query creation with reflection or something
	var query = req.pool.query(queryString, queryObject, function(err, results, fields) {
		if(err) {return next(err);}
		res.locals.data = results;
		res.json(res.locals);
	});
	console.log(query.sql);
}

function find_and_respond(req, res, next, queryString, queryObject) {
	var query = req.pool.query(queryString, queryObject, function(err, results, fields) {
		if(err) {return next(err);}
		else if(results.length != 1)
			return next(new Error("not found"));
		res.locals.data = results[0];
		res.json(res.locals);
	});
	console.log(query.sql);
}

module.exports.modify_user = function modify_user(req, res, next, queryString){
	var queryObjectUser = {
		last_name 	: req.body.last_name,
		first_name 	: req.body.first_name,
		email 		: req.body.email,
		college 	: req.body.college,
		gender		: req.body.gender,
		birthday	: req.body.birthday//sanitize birthday as date
	};
	modify_and_respond(req, res, next, queryString, queryObjectUser);
}

module.exports.modify_event = function modify_event(req, res, next, queryString){
	var queryObjectEvent = {
		name		: req.body.name,
		price		: req.body.price,
		address		: req.body.address,
		address2	: req.body.address2,
		city 		: req.body.city,
		state		: req.body.state,
		is_public	: req.body.is_public,
		start_date	: req.body.start_date,
		start_time	: req.body.start_time,
		end_date	: req.body.end_date,
		end_time	: req.body.end_time
	};
	modify_and_respond(req, res, next, queryString, queryObjectEvent);
}

module.exports.modify = modify_and_respond;
module.exports.find = find_and_respond;