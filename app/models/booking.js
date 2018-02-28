const validator=require('validator');
const mongoose =require('mongoose');
const jwt=require('jsonwebtoken');
const _=require('lodash');

var BookingSchema=new mongoose.Schema({
    userId:{
        type:String,
        required:[true,'userId is empty']
    },
    patientId:{//Todo: booking for user memebers (in case user is patient then patientid is equals userId)
        type:String
    },
    doctorId:{
        type:String,
        required:[true,'DoctorId is empty'],
    },
    slotId:{
        type:Number,
        required:[true,'slotId is empty']
    },
    appointmentDate:{
        type:Date
    },
    bookingDate:{
        type:Date
    },
    bookingStatus:{//Todo: Booked:After user confirmation,Confirm:After assistant confirm, open:after Doctor prospon his time
        type:String,
        enum:['Booked','Confirm','Open','Closed','Cancel']
    }
});


var Booking=mongoose.model('Booking',BookingSchema);
module.exports.Booking=Booking;