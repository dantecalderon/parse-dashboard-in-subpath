var express = require('express');
var ParseServer = require('parse-server').ParseServer;
var ParseDashboard = require('parse-dashboard');

const port = 1338;

var api = new ParseServer({
	// Parse Server settings
  databaseURI: 'mongodb://dev:pass@localhost:27220', // Connection string for your MongoDB database
  appId: 'hello',
  port,
  masterKey: 'world', // Keep this key secret!
  serverURL: `http://localhost:${port}/parse` // Don't forget to change to https if needed
});


const app = express();

// make the Parse Server available at /parse
app.use('/parse', api);


var dashboard = new ParseDashboard({
  apps: [
    {
      "serverURL": `http://localhost:${port}/parse`,
      "appId": "myAppId",
      "masterKey": "myMasterKey",
      "appName": "MyApp"
    }
  ],
}, { allowInsecureHTTP: true });

const dashboardApp = express();
// ParseDashboard takes '/dashboard' as mountpath
dashboardApp.use('/dashboard', dashboard);

// Mount dashboard at /sub/path/dashboard
app.use('/sub/path/', dashboardApp);


const httpServer = require('http').createServer(app);
httpServer.listen(port);
console.log('Listened at ' + `http://localhost:${port}`)
console.log('Dashboard listening at', `http://localhost:${port}/sub/path/dashboard`)
