const express=require("express")
const router=express.Router()
const {check,validationResult}=require("express-validator")
const  Ticket = require("../../models/Ticket")
const auth =require("../../middleware/auth")
// creating a ticket
router.post("/",[

    check("name","name is required").not().isEmpty(),
    check("age","age is required").isLength({min:2}),
    check("gender","gender is required").not().isEmpty(),
    check("is_Booked","is_Booked is required").not().isEmpty(),
    check("startCity","startCity is required").not().isEmpty(),
    check("endCity","endCity is required").not().isEmpty(),
    check("busName","busName is required").not().isEmpty(),
    check("seat_No","seat_No is required").isLength({min:2}),
    check("status","status is required").not().isEmpty(),
    check("phoneNumber","phoneNumber is required").isLength({ min:10 }),
    check("costOfTicket","costOfTicket is required").isLength({min:3})

],async(req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array ()})
    }
    try{
        const ticket = new Ticket(req.body)
        const ticketCreated = await ticket.save()
        res.status(201).send(ticketCreated)
    }catch(err){
        res.send(err.message)

    }
})
// getting all tickets
router.get('/',async(req,res)=>{
    try{
        const getAllTickets =  await Ticket.find()
        res.send(getAllTickets)

    }catch(err){
        res.status(500).send(err.message)
    }
})
// getting ticket by id
router.get("/:id",async(req,res)=>{
    try{

        const id = req.params.id
        const ticketData = await Ticket.findById(id)
        if(!ticketData){
            res.status(404).send()
        }
        else{
            res.send(ticketData)
        }
    }catch(err){
        res.status(500).send(err.message)

    }

})
// already booked ticket
router.get("/closed",async(req,res)=>{
    try{
        const ticketesData = await Ticket.find({ is_Booked:true })
        res.send(ticketesData)

    }catch(err){
        res.send(err.message)

    }
})
// to display not booked  tickets
router.get("/open",async(req,res)=>{
    try{
    const openTicketsData= await Ticket.find({ is_Booked:false })
    res.send(openTicketsData)
    }
    catch(err){
        res.status(500).send(err.message)
    }
})
// updating tickets
router.put("/:id",async(req,res)=>{
    // console.log("shabeera")
    try{
        const id = req.params.id
        const updateTicketData = await Ticket.findByIdAndUpdate(id,req.body)
        res.send(updateTicketData)

    }catch(err){
        res.send(err.message)

    }
})
// reset the ticket
router.put("/reset",async(req,res)=>{
    console.log("shabeera")
    try{
        const updateTicketData= await Ticket.updateMany({is_Booked:true},{is_Booked:false})
        res.send(updateTicketData)
    }catch(err){
        res.status(500).send(err.message)

    }
})

// delete the ticket
router.delete("/:id",async(req,res)=>{
    try{
        const deleteTicketData = await Ticket.findByIdAndDelete(req.params.id)
        if(!req.params.id){
            return res.status(404).send()

        }
        res.send(deleteTicketData)

    }catch(err){
        res.status(500).send(err.message)

    }
})
module.exports = router