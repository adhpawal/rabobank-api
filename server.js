const RaboRouter = require('./api/routes/raboBankRoutes');
const bodyParser = require('body-parser');

//TODO : Move Port to Configuration File
var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000;

  //Default Header Settigs
  app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
    res.header('Access-Control-Expose-Headers', 'Content-Length');
    res.header('Access-Control-Allow-Headers', 'Accept, Authorization, Content-Type, X-Requested-With, Range');
    if (req.method === 'OPTIONS') {
        return res.send(200);
    } else {
        return next();
    }
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

RaboRouter.routesConfig(app)

app.listen(port);


