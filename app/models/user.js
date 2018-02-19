const mongoose =require('mongoose');
const validator=require('validator');
const jwt=require('jsonwebtoken');
const _=require('lodash');
const bcrypt=require('bcryptjs');

//var User=mongoose.model('User',{
var UserSchema=new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        //validate: [validator.notEmpty, 'Name is empty'],
        trim:true,
        minlength:1,
    },
    lastName:{
        type:String,
    },
    mobile: {
        type: String,
        required: [true, '1Please enter mobile number.'],
        // validate: {
        //   validator: (value)=> {
        //     return /\d{3}-\d{3}-\d{4}/.test(value);
        //   },
        //   message: '{VALUE} is not a valid phone number!'
        // },
        //index: { unique: true }
      },
    email:{
        type:String,
        required:true,
        trim:true,
        minlength:1,
        //unique:true,
        // validate:{
        //     validator:validator.isEmail,
        //     message:'{VALUE} is not a valid email'
        // },
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
        // required:true,   
        // minlength:6

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
    members:[{
        firstName:{
            type:String,
            //required:true,
           // validate: [validator.notEmpty, 'Name is empty'],
            trim:true,
          //  minlength:1,
        },
        mobile: {
            type: String,
           // required: [true, 'Please enter mobile number.'],
            // validate: {
            //   validator: (value)=> {
            //     return /\d{3}-\d{3}-\d{4}/.test(value);
            //   },
            //   message: '{VALUE} is not a valid phone number!'
            // },
          },
        gender:{
            type:String
        },
        dateOfBirth:{
            type:Date,
            //required:[true,'please enter birth date.']
        },
        relationship:{
            type:String
        },
        cretedDate:{
            type:Date,
            default:Date.now(),
        },
    }]
});


//hide the return result details of password and token
// UserSchema.methods.toJSON=function(){
//     var user=this;
//     var userObject=user.toObject();
//     return _.pick(userObject,['_id','email']);
// };

// Apply Authentication on user model
UserSchema.methods.generateAuthToken=function(){
    var user=this;
    var access='auth';
    debugger;
    var token=jwt.sign({_id:user._id.toHexString()},'abc123').toString();

    user.tokens.push({access,token});
    debugger;
    return user.save().then(()=>{
        debugger;
        return token
    });
    
};

//remove token with token value
UserSchema.methods.removeToken=function(token){
    var user =this;// small case user bcs instance method
    
    return user.update({
        $pull:{
            tokens:{token}
        }
    });
};

//private route authenticate
UserSchema.statics.findByToken=function(token){
    var User=this;
    var decoded;
    try{
        decoded=jwt.verify(token,'abc123')
    }
    catch(e){
        // return new Promise((resolve,reject)=>{
        //     reject();
        // });
        return Promise.reject();
    }

    return User.findOne({
        '_id':decoded._id,
        'tokens.token':token,
        'tokens.access':'auth'
    });
};

UserSchema.statics.findByCredentials=function(email,password){
    var User=this;
    return User.findOne({email}).then((user)=>{
        if(!user){
            return Promise.reject();
        }

        return new Promise((resolve,reject)=>{
            //use bcrypt compare password with user.password
            bcrypt.compare(password,user.password,(err,res)=>{
                if(res===true){
                    resolve(user);
                }
                else{
                    reject();
                }
            });
        });
    });
};

// Password hashing
UserSchema.pre('save',function(next){
    var user=this;

    if(user.isModified('password')){
        bcrypt.genSalt(10,(err,salt)=>{
            bcrypt.hash(user.password,salt,(err,hash)=>{
                user.password=hash;
                 next();
            });
       });
    }else{
        next();
    }

});
//User model
var User=mongoose.model('User',UserSchema);

module.exports.User=User;
