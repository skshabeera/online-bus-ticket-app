const mongoose = require("mongoose")
const TicketSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true

    },
    age:{
        type:Number,
        reruired:true
    },
    gender:{
        type:String,
        required:true
    },
    is_Booked:{
        type:Boolean,
        default:false

    },
    startCity:{
        type:String,
        required:true

    },
    endCity:{
        type:String,
        required:true
    },
    busName:{
        type:String,
        required:true
    },
    seat_No:{
        type:Number,
        required:true,
        unique:true
    },
    costOfTicket:{
        type:Number,
        required:true
    },
    status:{
        type:String
    },
    // password:{
    //     type:String,
    //     required:true
    // },
    
    phoneNumber:{
        type:Number,
        min:10,
        required:true,
        unique:true
    },
    date:{
        type:Date,
        default:Date.now
    }

})
module.exports=Ticket=mongoose.model("ticket",TicketSchema)
