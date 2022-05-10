const mongoose=require("mongoose")
const BusSchema= new mongoose.Schema({
    busNumber:{
        type:Number
    },
    numberOfSeats:{
        type:Number
    },
    busName:{
        type:String
    },
    startCity:{
        type:String
    },
    endCity:{
        type:String
    },
    description:{
        type:String
    },
    Arrival_date:{
        type: Date,
        default: Date.now()
    },
     Departure_date:{
        type: Date,
        default: Date.now()
    },
    // Arrival_time:{
    //     type: Date,
    //     default: Date.now()
    // },
    // Departure_time:{
    //     type: Date,
    //     default: Date.now()
    // }

})
module.exports=User=mongoose.model("bus",BusSchema)