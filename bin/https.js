#!/usr/bin/env node

//for use with pkill
process.title = "open-server";

var app = require('../app');
var https = require('https');
const fs = require('fs');

// Create servers and listen

var credentials = {
	key:  fs.readFileSync('/etc/letsencrypt/live/api.theplugsocial.com/privkey.pem', 'utf8'), 
	cert: fs.readFileSync('/etc/letsencrypt/live/api.theplugsocial.com/fullchain.pem', 'utf8')
};

var httpsServer = https.createServer(credentials, app);

httpsServer.listen(443);
httpsServer.on('listening', function() {
  console.log('HTTPS Listening on ', httpsServer.address() );
});



