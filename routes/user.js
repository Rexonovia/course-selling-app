const { Router } = require("express");
const { z, late, ParseStatus } = require('zod');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const { userModel } = require('../db')
const userRouter = Router()
require("dotenv").config();
const JWT_SECURE = process.env.USER_SECRET_KEY;

userRouter.post("/signup", async (req, res) => {
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
        await userModel.create({
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
userRouter.post("/signin", async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const user = await userModel.findOne({
        email: email
    });
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (isPasswordValid && user) {
        const token = jwt.sign({
            userId: user._id.toString()
        }, JWT_SECURE)
        res.json({
            token: token,
            msg: "User logged in"
        })

    }
    res.status(400).json({
        error: "Invalid email or password"
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