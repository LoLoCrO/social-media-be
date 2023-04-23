import { Request, Response } from 'express';
import User from '../models/user';
import dataSource from '../config/database';

export const getUsers = async (req: Request, res: Response) => {
    try {
        const users = await dataSource.manager.find(User);
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err });
    }
};

export const getUserById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const user = await dataSource.manager.findOne(User, { where: { id: parseInt(id) } });
        if (!user) {
            return res.status(404).json({ message: `User with id ${id} not found` });
        }
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: err });
    }
};

export const updateUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { firstName, lastName, email, username, bio } = req.body;

        const user = await dataSource.manager.update(
            User,
            { where: { id: parseInt(id) } },
            { firstName, lastName, email, username, bio }
        );

        if (!user.affected) {
            return res.status(404).json({ message: `User with id ${id} not found` });
        }
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: err });
    }
};

export const deleteUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const user = await dataSource.manager.delete(User, { where: { id } });
        if (!user.affected) {
            return res.status(404).json({ message: `User with id ${id} not found` });
        }
        res.json({ message: `User with id ${id} deleted successfully` });
    } catch (err) {
        res.status(500).json({ message: err });
    }
};
