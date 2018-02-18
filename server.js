require('./config/config');

const _=require('lodash');
const express=require('express');
const bodyParser=require('body-parser');
const {ObjectID}=require('mongodb');

var {mongoose} =require('./db/mongoose');
var {User}=require('./models/user');
var{authenticate}=require('./middleware/authenticate');
var app=express();
// Root Express App
// ----------------

var app = express();

// Sub-Apps
// --------
var api = require("./AdminRoutes/app");

app.use("/api", api);

// Exports
// -------

module.exports = app;
