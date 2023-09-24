
// import yahooFinance from 'yahoo-finance2';
const yahooFinance = require('yahoo-finance2').default;
const keys = require("./keys");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());

console.log(`Your port is ${process.env.PORT}`); // undefined
const dotenv = require('dotenv');
dotenv.config();
console.log(`Your port is ${process.env.PORT}`);
console.log(`Your port is ${process.env.NODE_ENV}`);

// Postgress client setup
const { Pool } = require("pg");
const { error } = require("console");
const pgClient = new Pool({
    user: keys.pgUser,
    host:keys.pgHost,
    database:keys.pgDatabase,
    password:keys.password,
    port:keys.pgPort
});

pgClient.on("connect", client =>{
    client
        .query("CREATE TABLE IF NOT EXISTS values (number INT)")
        .catch(err=>console.log(err));
});

app.get("/",async (req,res)=>{
    console.log(keys.pgDatabase);
    const quote = await yahooFinance.quote('AAPL');
    res.json(quote);
    // res.send("Hi");
});

app.get("/values/all" , async (req,res)=>{
    const values = await pgClient.query("SELECT * FROM values").catch(err=>console.log(err));;

    res.send(values);
});

app.post("/values",async(req,res)=>{
    if(!req.body.value) res.send({working:false});

    pgClient.query("INSERT INTO  values(number) VALUES($1)", [req.body.value]);
    res.send({working:true});
});

app.listen(process.env.PORT,(err)=>{
    console.log("Listening");
})

