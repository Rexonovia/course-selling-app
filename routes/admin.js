const { Router } = require('express');
const {adminModel}=require('../db');
adminRouter = Router();

adminRouter.post("/signup", (req, res) => {
    
    res.json({
        msg: "signup endpoint"
    })
})
adminRouter.post("/signin", (req, res) => {
    res.json({
        msg: "signin endpoint"
    })
})
adminRouter.post("/", (req, res) => {
    res.json({
        msg: "signin endpoint"
    })
})
adminRouter.put("/", (req, res) => {
    res.json({
        msg: "signin endpoint"
    })
})
adminRouter.get("/bulk", (req, res) => {
    res.json({
        msg: "signin endpoint"
    })
})
module.exports={
    adminRouter:adminRouter
}