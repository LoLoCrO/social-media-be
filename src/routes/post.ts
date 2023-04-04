import express from 'express';
import { getPosts, createPost, getPostById, updatePost, deletePost } from '../controllers/post';
import authenticate from '../middleware/auth';

const router = express.Router();

router.get('/', getPosts);

router.post('/', authenticate, createPost);

router.get('/:postId', getPostById);

router.put('/:postId', authenticate, updatePost);

router.delete('/:postId', authenticate, deletePost);

export default router;
