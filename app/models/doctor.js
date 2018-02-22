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
    registerId:{
        type:String,
        maxlength:50
    },
    qualification:{
        type:String
        maxlength:100
    },
    specialist:{
        type:String,
        maxlength:100
    },
    verifiedStatus:{
        type:String,
        enum:['Open','Failed','Pending','Verified'],
        default:'Open'
    },
    location:[{
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
        }
        latitude:{
            type:Number
        },
        longitude:{
            type:Number
        }
    }],
    gender:{
        type:String,
        enum:['Male','Female','Other']
    },
    dateOfBirth:{
        type:Date,
        required:[true,'please enter birth date.']
    },
    createdDate:{
        type:Date,
        default:Date.now(),
    },
    updatedDate:{
        type:Date
    },
    password:{
        type:String,
        // required:true,   
        // minlength:6,
        //maxlength:20

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
            //unique: true 
            },
        gender:{
            type:String,
            enum: ['Male', 'Female','Other']
        },
        dateOfBirth:{
            type:Date,
            //required:[true,'please enter birth date.']
        },
        role:{
            type:String,
            maxlength:20
        },
        createdDate:{
            type:Date,
            default:Date.now(),
        }
    }]
});

var Doctor=mongoose.model('Doctor',DoctorSchema);
model.exports.Doctor=Doctor;