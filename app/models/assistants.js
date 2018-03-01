const mongoose =require('mongoose');
const validator=require('validator');

var AssistantSchema=new mongoose.Schema({
        firstName:{
            type:String,
            required:[true,'Member name is empty'],
            trim:true,
            maxlength:20
        },
        mobile: {
            type: Number,
            required: [true, 'Please enter memeber mobile number.'],
            validate: {
            validator: function(v) {
                    return /^[0-9]{10}$/.test(v);
                },
            message: '{VALUE} is not a valid phone number!'
            },
            unique: true 
        },
        email:{
            type:String,
            required:[true,'should not a empty email'],
            trim:true,
            minlength:1,
            unique:true,
            validate:{
                validator:validator.isEmail,
                message:'{VALUE} is not a valid email'
                },
            maxlength:50
        },
        gender:{
            type:String,
            enum: ['Male', 'Female','Other']
        },
        accessRole:{
            type:String,
            enum:['Normal','Partial','Admin'],
            default:'Normal'
        },
       password:{
            type:String,
            required:true,   
            minlength:6,
            maxlength:20
        },
        createdAt:{
            type:Date,
            default:Date.now(),
        }
    }
    ,{ _id : false });

 
module.exports.AssistantSchema=AssistantSchema;