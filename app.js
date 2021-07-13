var express = require('express');
var ParseServer = require('parse-server').ParseServer;
var ParseDashboard = require('parse-dashboard');

const port = 4040;

var api = new ParseServer({
	// Parse Server settings
  databaseURI: 'mongodb://dev:pass@localhost:27220', // Connection string for your MongoDB database
  appId: 'myAppId',
  port,
  masterKey: 'myMasterKey', // Keep this key secret!
  serverURL: `http://localhost:${port}/parse` // Don't forget to change to https if needed
});

var options = { allowInsecureHTTP: true };

var dashboard = new ParseDashboard({
  apps: [
    {
      "serverURL": `http://localhost:${port}/parse`,
      "appId": "myAppId",
      "masterKey": "myMasterKey",
      "appName": "MyApp"
    }
  ],
  users: [
    {
      user: 'user',
      pass: 'pass'
    }
  ]
}, options);

var app = express();

// make the Parse Server available at /parse
app.use('/parse', api);

// make the Parse Dashboard available at /dashboard
app.use('/dashboard', dashboard);

var httpServer = require('http').createServer(app);
httpServer.listen(port);
console.log('Listened at ' + `http://localhost:${port}`)