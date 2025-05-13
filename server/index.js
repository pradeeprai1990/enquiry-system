let express=require("express")
let app=express()
let cors=require("cors")
const { dbConnection } = require("./App/config/dbConnection")
const { ObjectId } = require("mongodb")
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


app.put('/enquiry/update/:id',async (req,res)=>{
    let {id}=req.params;
    let {name,email,phone}=req.body;
    let db=await dbConnection()
    let enquiryTable=await db.createCollection("enquiry")
    let updateObj={
        name,
        email,
        phone
    }

    let updateRes=await enquiryTable.updateOne({_id:new ObjectId(id)},{$set:updateObj})
    let obj={
        status:1,
        msg:"Data Update",
        updateRes
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

app.delete("/enquiry/delete/:id",async (req,res)=>{  //http://localhost:8000/enquiry/delete/68222b7a6f751d49e7222218
    let {id}=req.params //68222b7a6f751d49e7222218
    let db=await dbConnection()
    let enquiryTable=await db.createCollection("enquiry")
    let delRes=await enquiryTable.deleteOne({_id:new ObjectId(id)})
    let obj={
        status:1,
        msg:"Data Deleted",
        delRes
    }
    res.send(obj)
})

app.get('/enquiry/single/:cid',async (req,res)=>{
    let {cid}=req.params
    let db=await dbConnection()
    let enquiryTable=await db.createCollection("enquiry")
    let data=await enquiryTable.findOne({_id:new ObjectId(cid)})
    let obj={
        status:1,
        data
    }

    // res.send(obj)
    res.status(200).json(obj)
})
app.listen("8000") //http://localhost:8000