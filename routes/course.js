const { Router } = require("express");

const courseRouter= Router();


courseRouter.post("/purchase", (req, res) => {
    res.json({
        msg: "signin endpoint"
    })
})
courseRouter.get("/preview", (req, res) => {
    res.json({
        msg: "login endpoint"
    })
})
module.exports={
    courseRouter:courseRouter
}