var express = require('express');
var path = require('path');
var app = express();
var bodyParser = require('body-parser');

app.set('view engine', 'jade');
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({ extended: true  }));
app.use(bodyParser.json());

var port = process.env.PORT || 3000;

//var router = express.Router();

app.get('/', function (req, res) {
	res.render('index');
});

app.listen(port);
console.log('Sally on the way ' + port);
