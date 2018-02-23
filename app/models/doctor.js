const validator=require('validator');
const mongoose =require('mongoose');
const jwt=require('jsonwebtoken');
const _=require('lodash');
const bcrypt=require('bcryptjs');

var DoctorSchema=new mongoose.Schema({
    firstName:{
        type:String,
        required:[true,'Name is empty'],
        trim:true,
        maxlength:20
    },
    lastName:{
        type:String,
        maxlength:20
    },
    mobile: {
        type: Number,
        required: [true, 'Please enter mobile number.'],
         validate: {
            validator: function(v) {
                return /^[0-9]{10}$/.test(v);
            },
            message: '{VALUE} is not a valid phone number!'
        },
        unique:true 
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
    fees:{
        type:Number
    },
    feesNote:{
        type:String
    }
    description:{
        type:String,
        maxlength:1000
    },
    profilePhoto:{ //Todo: files toBe store on a physical path
        type:String, 
    },
    qualification:[{
        education:{ //Todo: multiple education should be quama seperated
            type:String
            maxlength:100
        },
        specialist:{ //Todo: multiple specialization should be quama seperated
            type:String,
            maxlength:500
        },
        experience:{
            type:Number,
        },
    }],
    verifiedStatus:{
        type:String,
        enum:['Not Varified','Failed','Pending','Verified'],
        default:'Not Varified'
    },
    feedback:[{
        userId:{
            type:String
        },
        like:{
            type:Boolean
        },
        comments:{
            type:String,
            maxlength:500
        },
        feedbackAt:{
            type:Date
        }
    }],
    clinics:[{
        name:{
            type:String,
            maxlength:100
        },
        registrationId:{
            type:String,
            maxlength:50
        },
        weeklyOff:{
                type:String,
                enum:['Sun','Mon','Tue','Wed','Thu','Fri','Sat'],
                default:'Sun'
        },
        timings:[{ //Todo: very high priority to provide update doctor calender
            day:{
                type:String,
                enum:['Sun','Mon','Tue','Wed','Thu','Fri','Sat'],
            },
            allDay:{ // All day same time slot?
                type:Boolean
            },
            halfDay:{
                type:String
                enum:['1st Half','2nd Half'],
            },
            openTime:{
                type:Date
            },
            closeTime:{
                type:Date
            },
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
                type:String
                maxlength:20
            },
            latitude:{
                type:Number
            },
            longitude:{
                type:Number
            }
        }]
    }],
     assistant:[{
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
    }],
    gender:{
        type:String,
        enum:['Male','Female','Other']
    },
    dateOfBirth:{//Todo: message like Birthdate will not disclose anywhere
        type:Date,
        required:[true,'please enter birth date.'] 
    },
    createdAt:{
        type:Date,
        default:Date.now(),
    },
    updatedAt:{
        type:Date
    },
    password:{
        type:String,
        required:true,   
        minlength:6,
        maxlength:20

    },
    isActive:{
        type:Boolean,
        default:true
    },
    deleted:{
       type:Boolean,
       default:false 
    },
     tokens:[{
        access:{
            type:String,
            require:true,
        },
        token:{
            type:String,
            require:true,
        }
    }],
   
});

var Doctor=mongoose.model('Doctor',DoctorSchema);
model.exports.Doctor=Doctor;