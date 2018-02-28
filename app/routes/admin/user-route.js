
var {User}=require('./../../models/user');

const {ObjectID}=require('mongodb');
const _=require('lodash');

// //POST /users
var user={
create:function(req,res){

    var body=_.pick(req.body,['firstName','email','password','mobile','dateOfBirth'
                             ,'members']);

    var user= new User(body); // for all our validation
    
    user.save().then(()=>{
        debugger;
        return user.generateAuthToken()
    }).then((token)=>{
        res.header('x-auth',token).send(user);
    }).catch((e)=>{
        res.status(400).send(e);
    });
},

//Private route and Auth middlware
getMe:function(req,res){
    res.send(req.user);
},

//Loggin In POST /users/login
login:function(req,res){
    var body=_.pick(req.body,['email','password']);
   //res.send(body);
   User.findByCredentials(body.email,body.password).then((user)=>{
        return user.generateAuthToken().then((token)=>{
            res.header('x-auth',token).send(user);
        });
   }).catch((e)=>{
       res.status(400).send();
   })
},


// Get /users/:id/1235
getById:function(req,res){
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
},

// Update the /users/:id
update:function(req,res){
    
    var id=req.params.id;
    var body=_.pick(req.body,['firstName','email','password','mobile','dateOfBirth'
                             ,'members']);

    if(!ObjectID.isValid(id)){
        return res.status(404).send();
    }
    User.findByIdAndUpdate(id,{$set:body},{new:true}).then((user)=>{
        if(!user){
            res.status(404).send();
        }
        res.send({user});
    }).catch((e)=>{
        res.status(404).send();
    })
},
//Logout: delete user token 
logout:function(req,res){
    req.user.removeToken(req.token).then(()=>{
        res.status(200).send();
    }),()=>{
        res.status(400).send();
    }
},

}
// Exports
// -------

module.exports = user;
