var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var routes = require('../API/Routes/routes.js');
routes(app);

app.listen(port, () => {    
    console.log(`Server running in http://localhost:${port}`);
});