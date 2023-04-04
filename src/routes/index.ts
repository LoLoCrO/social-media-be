import express from 'express';
import authRouter from './auth';
import userRouter from './user';
import postRouter from './post';
import commentRouter from './comment';

const router = express.Router();

router.use('/auth', authRouter);
router.use('/users', userRouter);
router.use('/posts', postRouter);
router.use('/comments', commentRouter);

export default router;
