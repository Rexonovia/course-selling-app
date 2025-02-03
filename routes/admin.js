const { Router } = require('express');
adminRouter = Router();

adminRouter.use(adminMiddleware);
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
adminRouter.post("/course", (req, res) => {
    res.json({
        msg: "signin endpoint"
    })
})
adminRouter.put("/course", (req, res) => {
    res.json({
        msg: "signin endpoint"
    })
})
adminRouter.get("/course", (req, res) => {
    res.json({
        msg: "signin endpoint"
    })
})
module.exports={
    adminRouter:adminRouter
}