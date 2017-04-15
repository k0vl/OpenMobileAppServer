var jwt = require('jsonwebtoken');
var https = require('https');

var express = require('express');
var router = express.Router();


/* GET events listing. */
router.route('/')
.all(function (req, res, next) {
	
	var fb_token = req.body.fb_token || req.query.fb_token;
	if(!fb_token) return next(new Error("no email address"));
    
    var app_id = "365331850489454";
    var app_secret = "1e20adbb45b3d6f97b47a974812ac470";

    var FB_options = {
        hostname: 'graph.facebook.com',
        path: '/debug_token?access_token=' + app_id+'|'+app_secret + '&input_token=' + fb_token
    };

    var FB_req = https.request(FB_options, function(response) {
        var str = '';
        response.on('data', function (chunk) {str += chunk;});
        response.on('end', function () {
            //var FB_res = JSON.parse(str);
            console.log(str);
        });
    });

    FB_req.on('error', function(e) {
        console.log('error with request to Facebook: ' + e.message);
    });

    FB_req.end();
});

module.exports = router;
