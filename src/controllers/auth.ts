import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User from '../user/model';
import bcrypt from 'bcryptjs';
import dataSource from '../config/database';
import { validateRegistration } from '../util/validators';

export const register = async (req: Request, res: Response) => {

    try {
        const { email, password, username } = req.body;

        const registraiton = validateRegistration(username, email, password);

        if (!registraiton.valid) {
            return res.status(400).json(registraiton.errors);
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await dataSource.manager.save(User, {
            email,
            username,
            password: hashedPassword
        });

        delete user.password;

        if (user.password) {
            throw new Error('Something went wrong');
        }

        const accessToken = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!);
        const refreshToken = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!);

        res.cookie('accessToken', accessToken, { httpOnly: true });
        res.cookie('refreshToken', refreshToken, { httpOnly: true });
        res.cookie('user', accessToken, { httpOnly: true });

        res.status(201).send({ status: 'success' });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'An error occurred while creating the user.' });
    }
};

export const login = async (req: Request, res: Response) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).send({ message: 'Username and password are required.' });
    }

    try {
        const user = await dataSource.manager.findOneBy(User, {
            username,
            password
        });

        if (!user) {
            return res.status(401).send({ message: 'Invalid username or password.' });
        }

        const isMatch = await bcrypt.compare(password, user.password);


        if (!isMatch) {
            return res.status(401).send({ message: 'Invalid username or password.' });
        }

        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!);

        res.cookie('accessToken', token, { httpOnly: true });
        res.cookie('refreshToken', token, { httpOnly: true });
        res.send({ user, token });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'An error occurred while logging in.' });
    }
};

export const logout = async (_req: Request, res: Response) => {
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');
    res.status(200).send({ message: 'Logged out.' });
};
