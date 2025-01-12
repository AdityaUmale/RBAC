import { Response, RequestHandler } from "express";
import  AuthRequest  from "../types";
import prisma from "../utils/db";

export const createPost: RequestHandler = async (req: AuthRequest, res: Response) => {
    const { title, content } = req.body;
    const user = req.user;
    try {
        const post = await prisma.post.create({
            data: {
                title,
                content,
                author: {
                    connect: {
                        id: user.id,
                    },
                },
            },
            include: {
                author: true,
            },
        });
        res.status(201).json({ message: "Post created successfully", data: post });
    } catch (error) {
        res.status(500).json({ message: "Error creating post" });
    }
};

export const getPosts: RequestHandler = async (req: AuthRequest, res: Response) => {
    try {
        const posts = await prisma.post.findMany({
            include: {
                author: true,
            },
        });
        res.status(200).json({ message: "Posts retrieved successfully", data: posts });
    } catch (error) {
        res.status(500).json({ message: "Error getting posts" });
    }
};

export const updatePost: RequestHandler = async (req: AuthRequest, res: Response) => {
    const id = parseInt(req.params.id); // Convert string to number
    const { title, content } = req.body;
    try {
        const post = await prisma.post.findUnique({
            where: {
                id: id,
            },
            include: { // Include the author relation
                author: true,
            }
        });
        if (!post) {
            res.status(404).json({ message: "Post not found" });
            return;
        }
        if (post.author.id !== req.user.id) {
            res.status(403).json({ message: "Unauthorized" });
            return;
        } 
        
        const updatedPost = await prisma.post.update({
            where: {
                id: id,
            },
            data: {
                title,
                content,
            },
            include: { // Include the author in the response
                author: true,
            }
        });
        res.status(200).json({ message: "Post updated successfully", data: updatedPost });
    } catch (error) {
        res.status(500).json({ message: "Error updating post" });
    }
};
    
export const deletePost: RequestHandler = async (req: AuthRequest, res: Response) => {
    const id = parseInt(req.params.id); // Convert string to number
    try {
        const post = await prisma.post.findUnique({
            where: {
                id: id,
            },
            include: { // Include the author relation
                author: true,
            }
        });
        if (!post) {
            res.status(404).json({ message: "Post not found" });
            return;
        }
        if (post.author.id !== req.user.id) {
            res.status(403).json({ message: "Unauthorized" });
            return;
        } 
        
        const deletedPost = await prisma.post.delete({
            where: {
                id: id,
            }
        });
        res.status(200).json({ message: "Post deleted successfully", data: deletedPost });
    } catch (error) {
        res.status(500).json({ message: "Error deleting post" });
    }
};