import { Router } from 'express';
import { createPost, getPosts, updatePost, deletePost } from '../controllers/postController';
import authMiddleware from '../middlewares/auth';

const router = Router();


router.get('/', getPosts);

router.post('/', authMiddleware, createPost);
router.put('/:id', authMiddleware, updatePost);
router.delete('/:id', authMiddleware, deletePost);

export default router;