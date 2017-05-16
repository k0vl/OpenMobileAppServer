var express = require('express');
var router = express.Router();

var modify = require('./util/modify');

/* GET users listing. */
router.route('/')
.get(function(req, res, next){
	//'SELECT user1_id FROM following WHERE user2_id = ?'  , "user1_id"
	modify.custom_query_all( req, res, next,  'SELECT contact FROM best_friend WHERE user_id = ?', [req.user.id] );
})
.post(function(req, res, next) {
	//both user id and contact are primary keys and cannot be null
	modify.custom_query_all( req, res, next, 'INSERT INTO best_friend SET ?', {user_id:req.user.id, contact:req.body["contact"]} );
})
.delete(function(req, res, next) {
	modify.custom_query_all( req, res, next, 'DELETE FROM best_friend WHERE user_id = ? AND contact = ?',  [req.user.id, req.body["contact"]] );
});

module.exports = router;