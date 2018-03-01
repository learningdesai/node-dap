const mongoose =require('mongoose');

var ClinicSchema=new mongoose.Schema({
        name:{
            type:String,
            maxlength:100
        },
        registrationId:{
            type:String,
            maxlength:50
        },
        weeklyOff:{ //Todo:multiple off by quama seperated
                type:String, 
                enum:['Sun','Mon','Tue','Wed','Thu','Fri','Sat'],
                default:'Sun'
        },
        slots:[{ //Todo: Auto fill by using slotIntrval from timings collection
            slotId:{
                type:Number,
            },
            slotName:{
                type:String
            }
        }],
        timings:[{ //Todo: very high priority to provide update doctor calender
            day:{
                type:String,
                enum:['Sun','Mon','Tue','Wed','Thu','Fri','Sat'],
            },
            allDay:{ // All day same time slot.
                type:Boolean
            },
            halfDay:{
                type:String,
                enum:['1st Half','2nd Half'],
            },
            openTime:{
                type:Date
            },
            closeTime:{
                type:Date
            },
            slotInterval:{
                type:Number
            }
        }],
        photos:{//Todo: multiple photo path Separated by quama and order by number like 1_photo.jpeg
            type:String
        },
        contact:[{
            address:{
                type:String,
                maxlength:250
            },
            address1:{
                type:String,
                maxlength:250
            },
            city:{
                type:String
            },
            state:{
                type:String
            },
            country:{
                type:String
            },
            pinCode:{
                type:Number,
                maxlength:10
            },
            phone:{
                type:String,
                maxlength:20
            },
            phone1:{
                type:String,
                maxlength:20
            },
            latitude:{
                type:Number
            },
            longitude:{
                type:Number
            }
        }]
 },
 { _id : false });

 
// var Clinic=mongoose.model('Clinic',ClinicSchema);
// module.exports.Clinic=Clinic;
module.exports.ClinicSchema=ClinicSchema;