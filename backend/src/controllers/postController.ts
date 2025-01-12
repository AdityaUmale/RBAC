import { Response } from "express";
import AuthRequest from "../types";
import prisma from "../utils/db";


const createPost = async (req:AuthRequest, res: Response) => {
    const { title, content, } = req.body;
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
        return res.status(500).json({ message: "Error creating post" });
    }
}

const getPosts = async (req: AuthRequest, res: Response) => {
    try {
        const posts = await prisma.post.findMany({
            include: {
                author: true,
            },
        });
        res.status(200).json({ message: "Posts retrieved successfully", data: posts });
    } catch (error) {
        return res.status(500).json({ message: "Error getting posts" });
    }
}

const updatePost = async (req: AuthRequest, res: Response) => {
    const { id } = req.params;
    const { title, content } = req.body;
    const post = await prisma.post.findUnique({
        where: {
            id: id,
        }
    });
    if (!post) {
        return res.status(404).json({ message: "Post not found" });
    }
    if (post.author.id !== req.user.id) {
        return res.status(403).json({ message: "Unauthorized" });
    } 
    try {
        const updatedPost = await prisma.post.update({
            where : {
                id: id,
            },
            data: {
                title,
                content,
            },
            });
            res.status(200).json({ message: "Post updated successfully", data: updatedPost });
        } catch (error) {
            return res.status(500).json({ message: "Error updating post" });
        }
}
    
const deletePost = async (req: AuthRequest, res: Response) => {
    const { id } = req.params;
    const post = await prisma.post.findUnique({
        where: {
            id: id,
        }
    });
    if (!post) {
        return res.status(404).json({ message: "Post not found" });
    }
    if (post.author.id !== req.user.id) {
        return res.status(403).json({ message: "Unauthorized" });
    } 
    try {
        const deletedPost = await prisma.post.delete({
            where: {
                id: id,
            }
        });
        res.status(200).json({ message: "Post deleted successfully", data: deletedPost });
    } catch (error) {
        return res.status(500).json({ message: "Error deleting post" });
    }
}