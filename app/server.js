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

var port=process.env.PORT || 3000;



// Sub-Apps
// --------
var api = require("./AdminRoutes/app");
debugger;
app.use("/api", api);
debugger;
// Exports
// -------
app.listen(port,()=>{
    debugger;
    console.log(`Started on port ${port}.`);
});
module.exports = app;
;