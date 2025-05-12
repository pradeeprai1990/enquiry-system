let express=require("express")
let app=express()
let cors=require("cors")
const { dbConnection } = require("./App/config/dbConnection")
app.use(cors())
app.use(express.json())

app.post('/enquiry/save',async (req,res)=>{
    let {name,email,phone}=req.body;
    let db=await dbConnection()
    let enquiryTable=await db.createCollection("enquiry")
    let insertObj={
        name,
        email,
        phone
    }

    let insertRes=await enquiryTable.insertOne(insertObj)
    let obj={
        status:1,
        msg:"Data Saved",
        insertRes
    }
    res.send(obj)
})


app.get('/enquiry/view',async (req,res)=>{
    let db=await dbConnection()
    let enquiryTable=await db.createCollection("enquiry")
    let data=await enquiryTable.find().toArray()

    let obj={
        status:1,
        data
    }

    // res.send(obj)
    res.status(200).json(obj)
})

app.listen("8000") //http://localhost:8000