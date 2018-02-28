const validator=require('validator');
const mongoose =require('mongoose');
const jwt=require('jsonwebtoken');
const _=require('lodash');

var NotificationSchema=new mongoose.Schema({
    alertType:{
        type:String,
        enum:['Reminder','Doctor In','Queue Stared','BeReady','Doctor Out','Emergency','Break','Hold']
    },
    alertSubject:{
        type:String
        maxlength:100
    },
    alertMessage:{
        type:String,
        maxlength:500
    },
    sentDate:{
        type:Date
    }

});

var Notification=mongoose.model('Notification',NotificationSchema);
module.exports.Notification=Notification;