const express = require('express');
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');

const app = express();


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(express.static(__dirname + '/public'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', require('./routes'));

app.listen(9000, ()=> console.info('Server is started...'));
