const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;


app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.otrke0o.mongodb.net/?retryWrites=true&w=majority`;


// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        // await client.connect();


        const postCollection = client.db('gsmManagerDB').collection('post');


        // Product

        app.post('/product', async(req, res)=>{
          const newPost = req.body;
          const result = await postCollection.insertOne(newPost);
          res.send(result);
        })

        app.get('/product', async(req, res)=>{
            const cursor = postCollection.find();
            const result = await cursor.toArray();
            res.send(result);
        })

        // My Cart


        app.post('/myCard', async(req, res)=>{
          const newPost = req.body;
          const result = await postCollection.insertOne(newPost);
          res.send(result);
        })

        app.get('/myCard', async(req, res)=>{
            const cursor = postCollection.find();
            const result = await cursor.toArray();
            res.send(result);
        })








        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);





app.get('/', (req, res) => {
    res.send('GSM Manegar Is Running Done');
});

app.listen(port, () => {
    console.log(`Server in Running On Port ${port}`);
});
