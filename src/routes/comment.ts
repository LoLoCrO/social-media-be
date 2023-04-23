import express from 'express';
import { getCommentsForPost, createCommentForPost, updateComment, deleteComment } from '../controllers/comment';
import authMiddleware from '../middleware/auth';

const commentRouter = express.Router();

commentRouter.get('/:postId/comments', authMiddleware, getCommentsForPost);

commentRouter.post('/:postId/comments', authMiddleware, createCommentForPost);

commentRouter.put('/:postId/comments/:commentId', authMiddleware, updateComment);

commentRouter.delete('/:postId/comments/:commentId', authMiddleware, deleteComment);

export default commentRouter;
