var express = require("express");
var path = require("path");
var logger = require("morgan");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var router = express.Router();
var user = require("./admin/user-route");
var doctor = require("./admin/doctor-route");
var{authenticate}=require('./../middleware/authenticate');


// API Express App
// ---------------

var app = express();
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

//------- Routes ---------
// User routes
app.post('/users',user.create);
app.get('/users/me',authenticate.user,user.getMe);
app.post('/users/login',user.login);
app.get('/users/:id',user.getById);
app.patch('/users/:id',user.update);
app.delete('/users/me/token',authenticate.user,user.logout);

// Doctor routes
app.post('/doctors', doctor.create);
app.get('/doctors/me',authenticate.doctor,doctor.getMe);




// API Specific 404 / Error Handlers
// ---------------------------------

// API not found
app.use(function(req, res, next){
    debugger;
  res.status(404).send();
});

// erorrs handler
app.use(function(err, req, res, next){
    debugger;
  var status = err.status || 500;
  res.status(status);
  res.json({
    app: "user-api",
    status: status,
    error: err.message
  });
});

//Test API:
app.get("/err", function(req, res, next){
    debugger;
  next(new Error("Some Error"));
});
app.get('/', function(req, res, next) {
    debugger;
  res.json({
    foo: "bar",
    baz: "quux"
  });
});

// Exports
// -------

module.exports = app;
