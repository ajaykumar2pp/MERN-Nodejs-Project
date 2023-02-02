require('dotenv').config()
const mongoose = require('mongoose');

exports.connectMonggose =()=>{
    mongoose.set("strictQuery", false);
    mongoose.connect(process.env.DATABASE_URL,
    {
        useNewUrlParser: true,
        useUnifiedTopology:true,
        // useCreateIndex:true

    })
    .then((e)=>console.log("Connected to Mongodb => MERN Project"))
    .catch((e)=>console.log("Not Connect Mongodb"))
}