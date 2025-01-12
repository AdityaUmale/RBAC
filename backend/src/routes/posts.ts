import { Router } from 'express';
import { createPost, getPosts, updatePost, deletePost, getPost } from '../controllers/postController';
import authMiddleware from '../middlewares/auth';
import roleCheckMiddleware from '../middlewares/roleCheck';

const postRoutes = Router();

postRoutes.get('/', getPosts);
postRoutes.get('/:id', getPost); 
postRoutes.post('/', authMiddleware, roleCheckMiddleware(['ADMIN']), createPost);
postRoutes.put('/:id', authMiddleware, roleCheckMiddleware(['ADMIN']), updatePost);
postRoutes.delete('/:id', authMiddleware, roleCheckMiddleware(['ADMIN']), deletePost);

export default postRoutes;  