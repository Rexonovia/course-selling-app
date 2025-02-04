const { Router } = require("express");
const userRouter = Router()
userRouter.post("/signup", (req, res) => {
    res.json({
        msg: "signup endpoint"
    })
})
userRouter.post("/signin", (req, res) => {
    res.json({
        msg: "signin endpoint"
    })
})
userRouter.post("/purchases", (req, res) => {
    res.json({
        msg: "signin endpoint"
    })
})
module.exports = {
    userRouter: userRouter
}