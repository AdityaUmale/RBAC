import { RequestHandler } from "express";
import prisma from "../utils/db";
import bcrypt from "bcryptjs";
import { registerSchema, loginSchema } from "../schemas/authSchema";
import jwt from "jsonwebtoken";

export const register: RequestHandler = async (req, res) => {
    const { name, email, password, role } = registerSchema.parse(req.body);
    try {
        const emailExists = await prisma.user.findFirst({
            where: {
                email: email,
            },
        });
        if (emailExists) {
            res.status(400).json({ message: "Email already exists" });
            return; 
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        
        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                role,
            },
        });
        const token = jwt.sign({ id: user.id, role: user.role, email: user.email }, process.env.JWT_SECRET as string);
        res.status(201).json({ message: "User created successfully", data: { user, token }});
    } catch (error) {
        res.status(500).json({ message: "Error creating user" });
    }
};

export const login: RequestHandler = async (req, res) => {
    const { email, password } = loginSchema.parse(req.body);
    try {
        const user = await prisma.user.findFirst({
            where: {
                email: email,
            }
        });
        if (!user) {
            res.status(400).json({ message: "Invalid email or password" });
            return;
        }
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            res.status(400).json({ message: "Invalid email or password" });
            return;
        }
        const token = jwt.sign({id: user.id, role: user.role, email: user.email}, process.env.JWT_SECRET as string);
        res.status(200).json({ message: "Login successful", data: { user, token }});
        console.log(token);
    } catch (error) {
        res.status(500).json({ message: "Error logging in" });
    }
};