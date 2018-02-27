
var {User}=require('./../../models/doctor');
var{authenticate}=require('./../../middleware/authenticate');
const {ObjectID}=require('mongodb');

const express = require('express');
var router = express.Router();
var bodyParser = require("body-parser");
const _=require('lodash');

// //POST /users
router.post('/doctors',(req,res)=>{
    var body=_.pick(req.body,['firstName','email','password','mobile','dateOfBirth'
                             ,'members.firstName','members.mobile']);

    //if members more than 1 above pick not picking a memebers object
    if(req.body.members!=undefined && req.body.members.length>1){
        var membersObj=_.pick(req.body,['members'])
        body = _.merge({}, membersObj, body);
    }
                               
    var user= new User(body); // for all our validation
    
    user.save().then(()=>{
        return user.generateAuthToken()
    }).then((token)=>{
        res.header('x-auth',token).send(user);
    }).catch((e)=>{
        res.status(400).send(e);
    });
});

module.exports = router;
