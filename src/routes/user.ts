import express from 'express';
import { updateUser, getUserById, deleteUser, getUsers } from '../controllers/user';
import auth from '../middleware/auth';

const userRouter = express.Router();

userRouter.get('/', auth, getUsers);

userRouter.get('/:id', auth, getUserById);

userRouter.put('/:id', auth, updateUser);

userRouter.delete('/:id', auth, deleteUser);

export default userRouter;
