
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

}
module.exports = doctor;
