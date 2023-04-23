import express from 'express';
import { getPosts, createPost, getPostById, updatePost, deletePost } from '../controllers/post';
import auth from '../middleware/auth';

const router = express.Router();

router.get('/', auth, getPosts);

router.post('/', auth, createPost);

router.get('/:postId', auth, getPostById);

router.put('/:postId', auth, updatePost);

router.delete('/:postId', auth, deletePost);

export default router;
