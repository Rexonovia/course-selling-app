const { Router } = require('express');
const { z } = require('zod');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
require('dotenv').config();
const { adminModel } = require('../db');
const { adminMiddleware } = require('../middleware/admin');
adminRouter = Router();
const JWT_SECURE = process.env.ADMIN_SECRET_KEY


adminRouter.post("/signup", async (req, res) => {
    const requireBody = z.object({
        firstName: z.string().min(3),
        lastName: z.string().min(3),
        email: z.string().email(),
        password: z.string().min(6)
    })
    const parse = requireBody.safeParse(req.body);
    if (!parse.success) {
        res.status(400).json({
            error: "Invalid data"
        });
        return;
    }

    const { firstName, lastName, email, password } = parse.data;
    const hashedPassword = await bcrypt.hash(password, 5);

    try {
        await adminModel.create({
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: hashedPassword
        })
    }
    catch (e) {
        res.status(400).json({
            error: "Email already exists"
        });
        return;
    }
    res.json({
        msg: "User created"
    })
})
adminRouter.post("/signin",async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const admin = await adminModel.findOne({
        email: email
    });
    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (isPasswordValid && admin) {
        const token = jwt.sign({
            adminId: admin._id.toString()
        }, JWT_SECURE)
        res.json({
            token: token,
            msg: "User logged in"
        })
    }
    else {
        res.status(400).json({
            error: "Invalid email or password"
        })
    }
})
adminRouter.post("/", adminMiddleware ,async (req, res) => {
    const adminId=req.adminId;
    const {title,description,price,imageUrl}=req.body;
    await courseModel.create({
        title,
        description,
        price,
        imageUrl,
        creatorId:adminId
    })
    res.json({
        msg: " Course Created",
        courseId:course._id
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
module.exports = {
    adminRouter: adminRouter
}