var express = require('express');
var router = express.Router();

var modify = require('./util/modify');

router.route('/')
.get(function(req, res, next) {
	modify.custom_query_1_row(req, res, next, 'SELECT * FROM events WHERE id =' + req.pool.escape(req.event.id));
})

.delete(function(req, res, next) {//TODO: varify the user owns the event
	modify.custom_query_all(req, res, next, 'DELETE FROM events WHERE id =' + req.pool.escape(req.event.id));
})
.post(function(req, res, next) {
	modify.modify_event(req, res, next, 'UPDATE events SET ? WHERE id=' + req.pool.escape(req.event.id));
})

module.exports = router;