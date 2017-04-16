var express = require('express');
var router = express.Router();

var modify = require('./util/modify').modify;

router.route('/')
.post(function(req, res, next) {
	modify(req, res, next, 'INSERT INTO following SET ?', 
		{user1_id:req.user.id, user2_id:req.user2.id});
})
.delete(function(req, res, next) {
	modify(req, res, next, 'DELETE FROM following WHERE'
							+ ' user1_id =' 		+ req.pool.escape(req.user.id)
							+ ' AND user2_id ='     + req.pool.escape(req.user2.id));
})

module.exports = router;