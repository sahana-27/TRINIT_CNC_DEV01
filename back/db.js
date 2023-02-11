const {MongoClient} = require('mongodb')
const url= 'mongodb+srv://nazraf:nandanaisaloser1@trinit.wyslvwy.mongodb.net/test';
const databaseName='phil'
const client= new MongoClient(url);

async function connectDB()
{
    let result = await client.connect();
    db= result.db(databaseName);
    return collection = db.collection('philan');
}

async function insert() {
    await client.connect();

    const db = client.db("phil");
    const coll = db.collection("philan");

    const docs = [
      {_id: "63e6fa1358e78af75cacb7b0"}
    ];
    const result = await coll.insertMany(docs);
    console.log(result.insertedIds);
}
module.exports = {
 insert,
 connectDB
};