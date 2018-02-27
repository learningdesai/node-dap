 
const validator=require('validator');
const mongoose =require('mongoose');
const jwt=require('jsonwebtoken');
//var relationship = require("mongoose-relationship"); //https://www.npmjs.com/package/mongoose-relationship

var TokenSchema=new mongoose.Schema({
    //tokenId auto generated on same day
    doctorId:{
        type:String
    },
    queueId:{ // from queue table _id
        type:String
    },
    tokenNumber:{
        type:String,
        required:true
    }
    bookingId:{ // from booking table _id
        type:String,
        required:true
    },
    tokenStatus:{
        type:String,
        enum:['To Be Ready','Clinic Confirm','Service Inprogress','Service Complete','Payment Done','Close']
    },
    tokenStatusTime:{
        type:Date
    },
    notification:[{
        type:Schema.ObjectId,
        ref:"Notification",
        childPath:"notification"
    }]
       
});

var Token=mongoose.model('Token',TokenSchema);
model.exports.Token=Token;