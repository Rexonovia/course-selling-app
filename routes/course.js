const { Router } = require("express");
const { userMiddleware } = require("../middleware/user");
const { purchaseModel } = require("../db");

const courseRouter= Router();


courseRouter.post("/purchase", userMiddleware,async (req, res) => {
    const userId=req.body.userId;
    const courseId=req.body.courseId;
    await purchaseModel.create({
        userId,
        courseId
    })

    res.json({
        msg: "you have successfully bought the course"
    })
})
courseRouter.get("/preview", async(req, res) => {
    const course=await courseModel.find({});
    res.json({
        course
    })
})
module.exports={
    courseRouter:courseRouter
}