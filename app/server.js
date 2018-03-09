require('./config/config');


const express=require('express');
var {mongoose} =require('./db/mongoose');

var app=express();

// Root Express App

var port=process.env.PORT || 3000;
// Sub-Apps
// --------
var api = require("./routes/app");
app.use("/api", api);
// Exports
// -------

app.listen(port,()=>{
    console.log(`Started on port ${port}.`);
});
module.exports.app = app;