const validator=require('validator');
const mongoose =require('mongoose');
const jwt=require('jsonwebtoken');
//var relationship = require("mongoose-relationship");  //https://www.npmjs.com/package/mongoose-relationship

var QueueConfigSchema=new mongoose.Schema({ 
    //queueId auto generated on same day morning before 1 hrs of queue start
    doctorId:{
        type:String
    },
    defaultQueueStatus:{
        type:String,
        enum:['Not Started','Doctor Confirm','Doctor In','Queue Started','Doctor Out','Hold','Close']
    },
    queueStatusTime:{
        type:Date
    },
    notification:[{
        type:Schema.ObjectId,
        ref:"Notification",
        childPath:"notification"
    }],
    notificationTime:{
        type:Date
    },
    schedule:[{
        fromDate:{
            type:Date
        },
        toDate:{
            type:Date
        },
        fromTime:{
            type:Date
        },
        toTime:{
            type:Date
        }
        day:{
            type:String,
            enum:['Sun','Mon','Tue','Wed','Thu','Fri','Sat'],
        },
        allDay:{ 
            type:Boolean
        }
    }]
    
});

var QueueConfig=mongoose.model('QueueConfig',QueueConfigSchema);
model.exports.QueueConfig=QueueConfig;