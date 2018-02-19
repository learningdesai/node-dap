var {User}=require('./../models/user');
var{authenticate}=require('./../middleware/authenticate');
var express = require('express');
var router = express.Router();
var bodyParser = require("body-parser");
const _=require('lodash');
// app.use(bodyParser.json());
// //POST /users
// app.post('/users',(req,res)=>{
//     var body=_.pick(req.body,['email','password']);
//     var user= new User(body); // for all our validation
    
//     user.save().then(()=>{
//         return user.generateAuthToken()
//     }).then((token)=>{
//         res.header('x-auth',token).send(user);
//     }).catch((e)=>{
//         res.status(400).send(e);
//     });
// });

// //Private route and Auth middlware
// app.get('/users/me',authenticate,(req,res)=>{
//     res.send(req.user);
// });

// //Loggin In POST /users/login
// app.post('/users/login',(req,res)=>{
//     var body=_.pick(req.body,['email','password']);
//    //res.send(body);
//    User.findByCredentials(body.email,body.password).then((user)=>{
//         return user.generateAuthToken().then((token)=>{
//             res.header('x-auth',token).send(user);
//         });
//    }).catch((e)=>{
//        res.status(400).send();
//    })
// });

// app.delete('/users/me/token',authenticate,(req,res)=>{
//     req.user.removeToken(req.token).then(()=>{
//         res.status(200).send();
//     }),()=>{
//         res.status(400).send();
//     }
// });


// module.exports = app;

//var express = require('express');

//var app=express.Router();

// Basic Route Demos
// -----------------
router.post('/users',(req,res)=>{
  debugger;
    //var body=({firstName:req.body.firstName,mobile:req.body.mobile,email:req.body.email,password:req.body.password,dateOfBirth:req.body.dateOfBirth});
    var body=_.pick(req.body,['firstName','email','password','mobile','dateOfBirth']);
    var user= new User(body); // for all our validation
    
    user.save().then(()=>{
        return user.generateAuthToken()
    }).then((token)=>{
        res.header('x-auth',token).send(user);
    }).catch((e)=>{
        res.status(400).send(e);
    });
});
router.get('/', function(req, res, next) {
  res.json({
    foo: "bar",
    baz: "quux"
  });
});

router.get("/err", function(req, res, next){
  next(new Error("Some Error"));
});

// API Specific 404 / Error Handlers
// ---------------------------------

// API not found
router.use(function(req, res, next){
  res.status(404);
  res.send();
});

// erorrs handler
router.use(function(err, req, res, next){
  var status = err.status || 500;
  res.status(status);
  res.json({
    app: "api",
    status: status,
    error: err.message
  });
});

// Exports
// -------

module.exports = router;
