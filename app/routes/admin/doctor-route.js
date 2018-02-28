
var {Doctor}=require('./../../models/doctor');

const {ObjectID}=require('mongodb');
const _=require('lodash');

var doctor = {

create: function(req, res) {
    var body=_.pick(req.body,['firstName','email','password','mobile','assistants']);
    var doctor= new Doctor(body); // for all our validation
    doctor.save().then(()=>{
        return doctor.generateAuthToken()
    }).then((token)=>{
        res.header('x-auth',token).send(doctor);
    }).catch((e)=>{
        debugger;
        res.status(400).send(e);
    });
},

//Private route and Auth middlware
getMe:function(req,res){
    res.send(req.doctor);
},

//Loggin In POST /doctor/login
login:function(req,res){
    var body=_.pick(req.body,['email','password']);
    //res.send(body);
    Doctor.findByCredentials(body.email,body.password).then((doctor)=>{
            return doctor.generateAuthToken().then((token)=>{
                res.header('x-auth',token).send(doctor);
            });
    }).catch((e)=>{
        res.status(400).send();
    });
},
// Get /doctors/:id/1235
getById:function(req,res){
    var id =req.params.id;
    if(!ObjectID.isValid(id)){
        return res.status(404).send();
    }
    Doctor.findById(id).then((doctor)=>{
        if(!doctor){
            return res.status(404).send();
        }
        res.send({doctor});
    }).catch((e)=>{
        res.status(400).send();
    });
},
// Update the /doctors/:id
update:function(req,res){
    
    var id=req.params.id;
    var body=_.pick(req.body,['firstName','email','password','mobile','assistants']);

    if(!ObjectID.isValid(id)){
        return res.status(404).send();
    }
    Doctor.findByIdAndUpdate(id,{$set:body},{new:true}).then((doctor)=>{
        if(!doctor){
            res.status(404).send();
        }
        res.send({doctor});
    }).catch((e)=>{
        res.status(404).send();
    })
},
//Logout: delete user token 
logout:function(req,res){
    req.doctor.removeToken(req.token).then(()=>{
        res.status(200).send();
    }),()=>{
        res.status(400).send();
    }
},

}
module.exports = doctor;
