let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let bodyParser = require('body-parser');
let fs = require('fs');
let cors = require('cors');

let app = express();
app.use(cors());
app.options('*', cors());

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', '*');
  res.header('Access-Control-Request-Headers', '*');
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');

    return res.status(200).json({});
  }
  next();
});

app.get('/', (req, res, next) => {
  try {
    let data = JSON.parse(fs.readFileSync('./public/data.json'));
    res.send(data);
  } catch (error) {
    next(error);
  }
});

app.post('/', (req, res, next) => {
  try {
    let data = JSON.stringify(req.body, null, 2);
    fs.writeFile('./public/data.json', data, finished);
    function finished() {
      try {
        console.log('all set', req.body);
      } catch (error) {
        next(error);
      }
    }
    let reply = {
      data,
      status: 'success!',
    };
    // res.header('Access-Control-Allow-Headers', '*');
    res.send(reply);
  } catch (error) {
    next(error);
  }
});

app.delete('/', (req, res, next) => {
  try {
    let data = JSON.stringify(req.body, null, 2);
    fs.writeFile('./public/data.json', data, finished);
    function finished() {
      try {
        console.log('remaining data after deleting rows:', req.body);
      } catch (error) {
        next(error);
      }
    }
    let reply = {
      data,
      status: 'success!',
    };
    res.send(reply);
  } catch (error) {
    next(error);
  }
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
