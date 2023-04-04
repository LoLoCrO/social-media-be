import { Router, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/user';
import bcrypt from 'bcryptjs';

const router = Router();

router.post('/register', async (req: Request, res: Response) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).send({ message: 'Username and password are required.' });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ username, password: hashedPassword });
        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!);

        res.cookie('token', token, { httpOnly: true });
        res.status(201).send({ user, token });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'An error occurred while creating the user.' });
    }
});

router.post('/login', async (req: Request, res: Response) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).send({ message: 'Username and password are required.' });
    }

    try {
        const user = await User.findOne({ where: { username } });

        if (!user) {
            return res.status(401).send({ message: 'Invalid username or password.' });
        }

        const isMatch = await bcrypt.compare(password, user.password);


        if (!isMatch) {
            return res.status(401).send({ message: 'Invalid username or password.' });
        }

        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!);

        res.cookie('token', token, { httpOnly: true });
        res.send({ user, token });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'An error occurred while logging in.' });
    }
});

router.post('/logout', async (_req: Request, res: Response) => {
    res.clearCookie('token');
    res.send({ message: 'Logged out.' });
});

export default router;
