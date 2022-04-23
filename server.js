//import
require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose")
const methodOverride = require("method-override");
const morgan = require("morgan");
const storeRouter = require("./controller/store")
const PORT = process.env.PORT || 3004;
const dbURL = process.env.MONGO_URL



// middleware
app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));
app.use(methodOverride("_method"));
app.use(morgan("tiny"));


//routes
app.use(storeRouter)

//database connection
mongoose.connect(dbURL,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
},
// this function assists unhandled promise rejection and in logging the err.message .on("error") idk why
()=>{}
)

//database connection err/success
const db = mongoose.connection
db.on("error",err=> console.log(err.message))
db.on("connected", ()=> console.log("Mongo Connected"))
db.on("disconnected",()=> console.log("Mongo Disconnected"))


// listener
app.listen(PORT, () => console.log(`We are listening on ${PORT}`))

