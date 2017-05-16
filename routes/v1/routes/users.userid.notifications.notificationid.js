var express = require('express');
var router = express.Router();

var modify = require('./util/modify');

/* GET users listing. */
router.route('/')
.get(function(req, res, next){
	//'SELECT user1_id FROM following WHERE user2_id = ?'  , "user1_id"
	modify.custom_query_all(req, res, next,  'SELECT * FROM notification WHERE id = ?', [req.notification.id]);
})
.delete(function(req, res, next) {
	modify.custom_query_all(req, res, next, 'DELETE FROM notification WHERE id = ?', [req.notification.id]);
});

module.exports = router;