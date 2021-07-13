import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
const ParseDashboard = require('parse-dashboard');

var options = { allowInsecureHTTP: true };



async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  var dashboard = new ParseDashboard({
    apps: [
      {
        "serverURL": `http://localhost:4040/parse`,
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

  app.use('/dashboard1', dashboard);

  await app.listen(3000);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
