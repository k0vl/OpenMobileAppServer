var https = require('https');

var express = require('express');
var router = express.Router();


/* GET events listing. */
router.route('/')
.all(function (req, res, next) {
	
	var fb_token = req.body.fb_token || req.query.fb_token;
	if(!fb_token) return next(new Error("no fb_token"));
    
    var FB_options = {
        hostname: 'graph.facebook.com',
        path: '/debug_token?access_token=' + req.app.get('fb-app-id') +'|'+ req.app.get('fb-app-secret') + '&input_token=' + fb_token
    };

    var FB_req = https.request(FB_options, function(response) {
        var str = '';
        response.on('data', function (chunk) {str += chunk;});
        response.on('end', function () {
            var FB_res = JSON.parse(str);

            res.locals.data = FB_res.data;
            return res.json(res.locals);
        });
    });

    FB_req.on('error', function(e) {
        return next(new Error('error with request to Facebook: ' + e.message));
    });

    FB_req.end();
});

module.exports = router;