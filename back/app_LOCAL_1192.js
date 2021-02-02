var express = require('express');
var app = express();
var clockRouter = require('./src/Clock/routes/clockRouter');
var googleRouter = require('./src/Google/routes/googleRouter');
var newsRouter = require('./src/News/routes/newsRouter');
var weatherRouter = require('./src/Weather/routes/weatherRouter');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./src/Swagger/swagger.yaml');
var port = 3000;
require('./src/Outlook/routes/outlookRouter');

app.use('/api/clock', clockRouter);
app.use('/api/google', googleRouter);
app.use('/api/news', newsRouter);
app.use('/api/weather', weatherRouter);
app.use('/api/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  next();
});

app.listen(port, function () {
  console.log('The API is listening on port ' + port);
});
