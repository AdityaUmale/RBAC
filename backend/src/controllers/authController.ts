import { Request, Response } from "express";
import prisma from "../utils/db";
import bcrypt from "bcryptjs";
import { registerSchema, loginSchema } from "../schemas/authSchema";
import jwt from "jsonwebtoken";


const register = async (req: Request, res: Response) => {
    const { name, email, password, role } = registerSchema.parse(req.body);
    try {
    const emailExists = await prisma.user.findFirst({
        where: {
            email: email,
        },
    });
    if (emailExists) {
        return res.status(400).json({ message: "Email already exists" });
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
        return res.status(500).json({ message: "Error creating user" });
    }
}

const login = async (req: Request, res: Response) => {
    const { email, password } = loginSchema.parse(req.body);
    try {
        const user = await prisma.user.findFirst({
            where: {
                email: email,
            }
        })
        if (!user) {
            return res.status(400).json({ message: "Invalid email or password" });
        }
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(400).json({ message: "Invalid email or password" });
        }
        const token = jwt.sign({id: user.id, role: user.role, email: user.email}, process.env.JWT_SECRET as string);
        res.status(200).json({ message: "Login successful", data: { user, token }});
    } catch (error) {
        return res.status(500).json({ message: "Error logging in" });
    }
}

export default register;