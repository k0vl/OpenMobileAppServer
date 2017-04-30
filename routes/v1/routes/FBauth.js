var https = require('https');
var res_login = require('./util/res-login');

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
            
            if(FB_res.error)
                return next(new Error(FB_res.error.code + ':' + FB_res.error.message));
            if(!FB_res.data.is_valid)
                return next(new Error(FB_res.data.error.code + ':' + FB_res.data.error.message));
            else if(FB_res.data.application != "Plug")
                return next(new Error( "token not for Plug app (application:" + FB_res.data.application + ")" ));

            var query = req.pool.query(
                'SELECT * FROM users WHERE fb_id = ?', [FB_res.data.user_id], 
                function on_sql_return(err, results, fields){
                    if(err)
                        return next(err);//handle sql error
                    else if(results.length != 1)
                        return next(new Error("user not found"));
                    res_login(results[0], req, res);
            });
        });
    });

    FB_req.on('error', function(e) {
        return next(new Error('error with request to Facebook: ' + e.message));
    });

    FB_req.end();
});

module.exports = router;
