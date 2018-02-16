const mongoose =require('mongoose');
const validator=require('validator');

//var User=mongoose.model('User',{
var UserSchema=new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        validate: [validators.notEmpty, 'Name is empty'],
        trim:true,
        minlength:1,
    },
    lastName:{
        type:String,
    },
    mobile: {
        type: String,
        required: [true, 'Please enter mobile number.'],
        validate: {
          validator: (value)=> {
            return /\d{3}-\d{3}-\d{4}/.test(value);
          },
          message: '{VALUE} is not a valid phone number!'
        },
        index: { unique: true }
      },
    email:{
        type:String,
        required:true,
        trim:true,
        minlength:1,
        unique:true,
        validate:{
            validator:validator.isEmail,
            message:'{VALUE} is not a valid email'
        },
        // validate:{
        //     validator: (value)=>{
        //         return validator.isEmail(value);
        //     }
        // },
        
    },
    address:{
        type:String,
    },
    city:{
        type:String
    },
    gender:{
        type:String
    },
    dateOfBirth:{
        type:Date,
        required:[true,'please enter birth date.']
    },
    cretedDate:{
        type:Date,
        default:Date.now(),
    },
    updatedDate:{
        type:Date
    },
    password:{
        type:String,
        required:true,   
        minlength:6
    }
});