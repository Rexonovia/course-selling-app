const { Router } = require('express');
const { courseModel, adminModel } = require('../db');
const { z } = require('zod');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { adminMiddleware } = require('../middleware/admin');
const { JWT_ADMIN_SECURE } = require('../config');
const adminRouter = Router();
const JWT_SECURE = JWT_ADMIN_SECURE;

adminRouter.post("/signup", async (req, res) => {
    const requireBody = z.object({
        firstName: z.string().min(3),
        lastName: z.string().min(3),
        email: z.string().email(),
        password: z.string().min(6)
    });

    const parse = requireBody.safeParse(req.body);
    if (!parse.success) {
        return res.status(400).json({ error: "Invalid data" });
    }

    const { firstName, lastName, email, password } = parse.data;
    const hashedPassword = await bcrypt.hash(password, 5);

    try {
        await adminModel.create(
            {
                firstName, lastName, email, password: hashedPassword

            });
        return res.json({ msg: "User created" });
    } catch (e) {
        return res.status(400).json({ error: "Email already exists" });
    }
});

adminRouter.post("/signin", async (req, res) => {
    const requireBody = z.object({
        email: z.string().email(),
        password: z.string().min(6)
    });

    const parse = requireBody.safeParse(req.body);
    if (!parse.success) {
        return res.status(400).json({ error: "Invalid email or password" });
    }

    const { email, password } = parse.data;
    const admin = await adminModel.findOne({ email });

    if (!admin) {
        return res.status(400).json({ error: "Invalid email or password" });
    }

    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid) {
        return res.status(400).json({ error: "Invalid email or password" });
    }

    const token = jwt.sign({ adminId: admin._id.toString() }, JWT_SECURE);
    return res.json({ msg: "Signin successful", token });
});

adminRouter.post("/course", adminMiddleware, async (req, res) => {
    const requireBody = z.object({
        title: z.string().min(3),
        description: z.string().min(10),
        price: z.number().positive(),
        imageUrl: z.string().url()
    });

    const parse = requireBody.safeParse(req.body);
    if (!parse.success) {
        return res.status(400).json({ error: "Invalid data" });
    }

    const adminId = req.adminId;
    const { title, description, price, imageUrl } = parse.data;

    const course = await courseModel.create({ title, description, price, imageUrl, creatorId: adminId });

    return res.json({ msg: "Course Created", courseId: course._id });
});
adminRouter.put("/course", adminMiddleware, async (req, res) => {
    const requireBody = z.object({
        courseId: z.string().min(1),
        title: z.string().min(3),
        description: z.string().min(10),
        price: z.number().positive(),
        imageUrl: z.string().url()
    });

    const parse = requireBody.safeParse(req.body);
    if (!parse.success) {
        return res.status(400).json({ error: "Invalid data" });
    }

    const adminId = req.adminId;
    const { courseId, title, description, price, imageUrl } = parse.data;

    const updatedCourse = await courseModel.findOneAndUpdate(
        { _id: courseId, creatorId: adminId },
        { title, description, price, imageUrl },
        { new: true }
    );

    if (!updatedCourse) {
        return res.status(400).json({ error: "Course not found or unauthorized" });
    }

    return res.json({ msg: "Course Updated", courseId: updatedCourse._id });
});


adminRouter.get("/course", adminMiddleware, async (req, res) => {
    const adminId = req.adminId;
    const courses = await courseModel.find({ creatorId: adminId });

    return res.json({ msg: "Courses Retrieved", courses });
});

module.exports = {
    adminRouter: adminRouter
};
