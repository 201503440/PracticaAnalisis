var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//______________________________________________________________________
const cors = require('cors');
var corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204 
}
app.use(cors(corsOptions));
//______________________________________________________________________

var routes = require('../API/Routes/routes.js');
routes(app);

app.listen(port, () => {
    console.log(`Server running in http://localhost:${port}`);
});