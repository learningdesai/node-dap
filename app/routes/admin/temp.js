

var {User}=require('./../../models/user');
var{authenticate}=require('./../../middleware/authenticate');
const {ObjectID}=require('mongodb');

const express = require('express');
var router = express.Router();
var bodyParser = require("body-parser");
const _=require('lodash');

// //POST /users
router.post('/users',(req,res)=>{

    var body=_.pick(req.body,['firstName','email','password','mobile','dateOfBirth'
                             ,'members.firstName','members.mobile']);

    //if members more than 1 above pick not picking a memebers object
    if(req.body.members!=undefined && req.body.members.length>1){
        var membersObj=_.pick(req.body,['members'])
        body = _.merge({}, membersObj, body);
    }
                               
    var user= new User(body); // for all our validation
    
    user.save().then(()=>{
        debugger;
        return user.generateAuthToken()
    }).then((token)=>{
        res.header('x-auth',token).send(user);
    }).catch((e)=>{
        res.status(400).send(e);
    });
});

//Private route and Auth middlware
router.get('/users/me',authenticate,(req,res)=>{
    res.send(req.user);
});

//Loggin In POST /users/login
router.post('/users/login',(req,res)=>{
    var body=_.pick(req.body,['email','password']);
   //res.send(body);
   User.findByCredentials(body.email,body.password).then((user)=>{
        return user.generateAuthToken().then((token)=>{
            res.header('x-auth',token).send(user);
        });
   }).catch((e)=>{
       res.status(400).send();
   })
});


// Get /users/:id/1235
router.get('/users/:id',(req,res)=>{
    var id =req.params.id;
    if(!ObjectID.isValid(id)){
        return res.status(404).send();
    }
    User.findById(id).then((user)=>{
        if(!user){
            return res.status(404).send();
        }
        res.send({user});
    }).catch((e)=>{
        res.status(400).send();
    });
});

// Update the /users/:id
router.patch('/users/:id',(req,res)=>{
    
    var id=req.params.id;
    var body=_.pick(req.body,['firstName','email','password','mobile','dateOfBirth'
                             ,'members.firstName','members.mobile']);

    //if members more than 1 above pick not picking a memebers object
    if(req.body.members!=undefined && req.body.members.length>1){
        var membersObj=_.pick(req.body,['members'])
        body = _.merge({}, membersObj, body);
    }
    if(!ObjectID.isValid(id)){
        return res.status(404).send();
    }
//--------------
      //  body.updatedDate=new Date().getTime();
//--------------
    User.findByIdAndUpdate(id,{$set:body},{new:true}).then((user)=>{
        if(!user){
            res.status(404).send();
        }

        res.send({user});
    }).catch((e)=>{
        res.status(404).send();
    })

});
//Logout: delete user token 
router.delete('/users/me/token',authenticate,(req,res)=>{
    debugger;   
    req.user.removeToken(req.token).then(()=>{
        res.status(200).send();
    }),()=>{
        res.status(400).send();
    }
});

// API Specific 404 / Error Handlers
// ---------------------------------

// API not found
router.use(function(req, res, next){
    debugger;
  res.status(404).send();
});

// erorrs handler
router.use(function(err, req, res, next){
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
router.get("/err", function(req, res, next){
    debugger;
  next(new Error("Some Error"));
});
router.get('/', function(req, res, next) {
    debugger;
  res.json({
    foo: "bar",
    baz: "quux"
  });
});


// Exports
// -------

module.exports = router;
