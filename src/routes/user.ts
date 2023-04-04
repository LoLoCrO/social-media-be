import express from 'express';
import { updateUser, getUserById, deleteUser, getUsers } from '../controllers/user';
import authenticate from '../middleware/auth';

const userRouter = express.Router();

userRouter.get('/', authenticate, getUsers);

userRouter.get('/:id', authenticate, getUserById);

userRouter.put('/:id', authenticate, updateUser);

userRouter.delete('/:id', authenticate, deleteUser);

export default userRouter;
