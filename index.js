const express=require('express');
const jwt=require('jsonwebtoken');
const app=express();
app.use(express.json());

app.post("/user/signup",(req,res)=>{
    res.json({
        msg:"signup endpoint"
    })
})
app.post("/user/signin",(req,res)=>{
    res.json({
        msg:"signin endpoint"
    })
})
app.post("/user/purchases",(req,res)=>{
    res.json({
        msg:"signin endpoint"
    })
})
app.post("/course/purchase",(req,res)=>{
    res.json({
        msg:"signin endpoint"
    })
})
app.get("/user/courses",(req,res)=>{
    res.json({
        msg:"login endpoint"
    })
})
app.listen(3000)