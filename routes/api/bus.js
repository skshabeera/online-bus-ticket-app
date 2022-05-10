const express=require("express")
const router=express.Router()
const {check,validationResult}=require("express-validator")
const Bus=require("../../models/Bus")
const auth=require("../../middleware/auth")



router.post('/',[
    check("busNumber","BusNumber is required").isLength({min:4}),
    check("numberOfSeats","number of seat required").isLength({min:2}),
    check("name","name is required").not().isEmpty(),
    check('startCity',"startCity is required").not().isEmpty(),
    check("endCity","endcity is required").not().isEmpty(),
    check ("description","Description is required").not().isEmpty(),
    check("Arrival_date","arrival_date is required").isDate(),
    check("Departure_date","Departure_date is required").isDate(),
    check("Arrival_time","arrival_time is required").not().isEmpty(),
    check("Departure_time","arrival_time is required").not().isEmpty(),
    




],
async(req,res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array ()})
    }
    try{
        let bus= new Bus(req.body)
        const buscreated = await bus.save()
        return  res.status(400).send(buscreated);
    }catch(err){
    
        console.error(err.message)

    }
})
router.get("/",async(req,res)=>{
    try{
      const busesData = await Bus.find()
      res.send(busesData)
    }catch(err){
        res.send(err.message)
    }
})
router.get("/:id",async(req,res)=>{
    try{
        const _id=req.params.id
        const busData= await Bus.findById(_id)
        if(!busData){
            res.status(404).send()
        }
        else{
            res.send(busData)
        }
        
    }catch(error){
        res.status(500).send(error.message)

    }
})
router.get("/:name",async(req,res)=>{
    try{
        const name=req.params.name
        const busData= await Bus.findOne(name)
        if(!busData){
            res.status(404).send()
        }
        else{
            res.send(busData)
        }
        
    }catch(error){
        res.status(500).send(error.message)

    }
})


module.exports=router
