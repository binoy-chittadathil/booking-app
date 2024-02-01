const mongoose=require('mongoose');
const bookingSchema=mongoose.Schema({
    place:{type:mongoose.Schema.Types.ObjectId,required:true,ref:'Place'},
    userId:{type:mongoose.Schema.Types.ObjectId,required:true},
    checkin:{type:Date,required:true},
    checkout:{type:Date,required:true},
    maxguests:{type:Number,required:true},
    name:{type:String,required:true},
    mobile:{type:String,required:true},
    bookingPrice:Number
});
const BookingModel=mongoose.model('Booking',bookingSchema);
module.exports=BookingModel