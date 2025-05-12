let { MongoClient }=require("mongodb")

let url=`mongodb://127.0.0.1:27017`

let client=new MongoClient(url)
let dbName="enquiryProject"
let dbConnection=async ()=>{
    await client.connect()
    let db=client.db(dbName)
    return db;
}
module.exports={dbConnection}