const validator=require('validator');
const mongoose =require('mongoose');
const jwt=require('jsonwebtoken');
const _=require('lodash');

var QueueSchema=new mongoose.Schema({
    doctorId:{
        type:String
    },
    bookingId:{
        type:String,
        required:[true,'userId is empty']
    },
    queueStatus:{
        type:String,
        enum:['Not Started','Started','Hold','Close']
    },
    queueHoldTime:{
        type:Date
    },
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
    }
});

var Queue=mongoose.model('Queue',QueueSchema);
model.exports.Queue=Queue;