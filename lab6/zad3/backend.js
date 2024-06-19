const express = require('express')
const { MongoClient } = require('mongodb')
const app = express()

const url = 'mongodb://database:27017';
const client = new MongoClient(url);

const dbName = 'db'

async function main(){
        await client.connect();
        const db = client.db(dbName);
        let users = await db.collection("user");
        let results = await users.find({}).toArray();
        return results
        }

async function wstawDane() {
        await client.connect();
        const db = client.db(dbName);
        let users = await db.collection("user");
        let results = await users.insertOne({"name": "user"})
        return results
        }

app.get('/', async (req, res) => {
        await wstawDane()
        console.log("get")
        const dane = await main()
        res.send(dane)
} )

app.listen(8000, "0.0.0.0", () => { console.log("App is listening on port 8000")} )