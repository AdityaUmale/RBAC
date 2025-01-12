import { Router } from 'express';
import { createPost, getPosts, updatePost, deletePost } from '../controllers/postController';
import authMiddleware from '../middlewares/auth';
import roleCheckMiddleware from '../middlewares/roleCheck';

const postRoutes = Router();

postRoutes.get('/', getPosts);
postRoutes.post('/', authMiddleware, roleCheckMiddleware(['ADMIN']), createPost);
postRoutes.put('/:id', authMiddleware, roleCheckMiddleware(['ADMIN']), updatePost);
postRoutes.delete('/:id', authMiddleware, roleCheckMiddleware(['ADMIN']), deletePost);

export default postRoutes;  