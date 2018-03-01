const validator=require('validator');
const mongoose =require('mongoose');
const jwt=require('jsonwebtoken');
//var relationship = require("mongoose-relationship");  //https://www.npmjs.com/package/mongoose-relationship

var QueueSchema=new mongoose.Schema({ 
    //queueId auto generated on same day morning before 1 hrs of queue start
    doctorId:{
        type:String
    },
    queueStatus:{
        type:String,
        enum:['Not Started','Doctor Confirm','Doctor In','Queue Started','Doctor Out','Hold','Close']
    },
    queueStatusTime:{
        type:Date
    },
    notification:[{
        type:Schema.Types.ObjectId,
        ref:"Notification",
        childPath:"notification"
    }]
    
});

var Queue=mongoose.model('Queue',QueueSchema);
module.exports.Queue=Queue;