const {ObjectID}=require('mongodb');
const jwt = require('jsonwebtoken');

const {Doctor}=require('./../../models/doctor');
const{User}=require('./../../models/user');

const userOneId=new ObjectID();
const userTwoId=new ObjectID();
const users=[{
    _id:userOneId,
    firstName:'Santosh',
    email:'santosh@example.com',
    password:'userOnePass',
    mobile:'1234567891',
    tokens:[{
        access:'auth',
        token:jwt.sign({_id:userOneId,access:'auth'},'abc123').toString()
    }]
},{
    _id:userTwoId,
    firstName:'User2',
    email:'user2@example.com',
    password:'userTwoPass',
    mobile:'1123456789',
     tokens:[{
        access:'auth',
        token:jwt.sign({_id:userTwoId,access:'auth'},'abc123').toString()
    }]
}]

const doctors=[{
    _id:userOneId,
    firstName:'Santosh_d',
    email:'santosh_d@example.com',
    password:'userOnePass',
    mobile:'1234567891',
    tokens:[{
        access:'auth',
        token:jwt.sign({_id:userOneId,access:'auth'},'abc123').toString()
    }]
},{
    _id:userTwoId,
   firstName:'User2_d',
    email:'user2_d@example.com',
    password:'userTwoPass',
    mobile:'1123456789',
     tokens:[{
        access:'auth',
        token:jwt.sign({_id:userTwoId,access:'auth'},'abc123').toString()
    }]
}]

const populateDoctors=(done)=>{
    Doctor.remove({}).then(()=>{
        return Doctor.insertMany(doctors);
    }).then(()=>done());
};

const populateUsers=(done)=>{
    User.remove({}).then(()=>{
        var userOne=new User(users[0]).save();
        var userTwo=new User(users[1]).save();
        return Promise.all([userOne,userTwo]);
    }).then(()=>done());
}
module.exports={doctors,populateDoctors,users,populateUsers};