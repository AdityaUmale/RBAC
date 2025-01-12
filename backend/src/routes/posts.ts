import { Router } from 'express';
import { createPost, getPosts, updatePost, deletePost } from '../controllers/postController';
import authMiddleware from '../middlewares/auth';

const postRoutes = Router();

postRoutes.get('/', getPosts);

postRoutes.post('/', authMiddleware, createPost);
postRoutes.put('/:id', authMiddleware, updatePost);
postRoutes.delete('/:id', authMiddleware, deletePost);

export default postRoutes;