const express=require('express');
const connection=require("./config/db");
const userRouter=require("../backend/route/user.route");
const ProfileRouter=require("../backend/route/profile.route");
const authentication=require("./middleware/authenticate")
require("dotenv").config();
const cors=require("cors");
const app=express();
app.use(cors({
origin:"*",
}))
app.use(express.json());

app.use("/users",userRouter)
// app.use(authentication)
app.use("/profile",ProfileRouter)

app.listen(process.env.port,async()=>{
    try{
        await connection;
        console.log("connection established");
    }catch(e){
        res.send("something went wrong")
        console.log(e);
    }
    console.log(`listening on port ${process.env.port}`)
});