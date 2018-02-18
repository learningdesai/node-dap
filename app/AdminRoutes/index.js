var {User}=require('./../models/user');
var{authenticate}=require('./../middleware/authenticate');
var express = require('express');
var app=express.Router();

//POST /users
app.post('/users',(req,res)=>{
    var body=_.pick(req.body,['email','password']);
    var user= new User(body); // for all our validation
    
    user.save().then(()=>{
        return user.generateAuthToken()
    }).then((token)=>{
        res.header('x-auth',token).send(user);
    }).catch((e)=>{
        res.status(400).send(e);
    });
});

//Private route and Auth middlware
app.get('/users/me',authenticate,(req,res)=>{
    res.send(req.user);
});

//Loggin In POST /users/login
app.post('/users/login',(req,res)=>{
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

app.delete('/users/me/token',authenticate,(req,res)=>{
    req.user.removeToken(req.token).then(()=>{
        res.status(200).send();
    }),()=>{
        res.status(400).send();
    }
});
app.listen(port,()=>{
    console.log(`Started on port ${port}.`);
});


module.exports.app = app