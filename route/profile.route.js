const express=require('express');
const ProfileModel = require("../model/profile.model");
const app=express.Router();

app.get("/getprofile",async(req,res)=>{
    let products = await ProfileModel.find();
    res.send(products);

})
app.post("/add", async (req, res) => {
    const payload = req.body;
    // console.log(payload)
    try {
      let newProduct = new ProfileModel(payload);
      await newProduct.save()
      res.send(newProduct);
    } catch (e) {
      res.send(e.message);
    }
  });

app.patch("/update/:id",async(req,res)=>{
const payload=req.body;
const id=req.params.id;
const profile=await ProfileModel.findOne({"_id":id});
console.log(profile)
const userID_in_note=profile.userID;
const userID_making_req=req.body.userID;
try{
    if(userID_making_req!==userID_in_note){
        res.send({msg:"You are not authorized "})
    }else{
        await ProfileModel.findByIdAndUpdate({"_id":id},payload);
        res.send("update data");
    }
}catch(err){
    console.log(err);
    res.send({"msg":"something went wrong"});
};
});
module.exports = app;
