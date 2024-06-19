const express = require('express');
const app = express()
require('dotenv').config();
require("./config/database.js")
const morgan = require('morgan')
const cors = require("cors")
const cookieParser = require('cookie-parser')

//middlewares
app.use(morgan("dev"))
app.use(express.json())
app.use(cors())
app.use(cookieParser())

app.use("/user",require("./route/userRoute"))

const PORT = process.env.PORT || 1234;
app.listen(PORT, (err)=>{
    if (err) {
        console.log("server crashed because : --->>> ", err)
    }
    else {
        console.log(`server is running at ${PORT}`)
    }
})
