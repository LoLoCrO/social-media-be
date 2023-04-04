import { Request, Response } from 'express';
import User from '../models/user';

export const getUsers = async (req: Request, res: Response) => {
    try {
        const users = await User.findAll({ attributes: { exclude: ['password'] } });
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const getUserById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const user = await User.findByPk(id, { attributes: { exclude: ['password'] } });
        if (!user) {
            return res.status(404).json({ message: `User with id ${id} not found` });
        }
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const updateUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { firstName, lastName, email, username, bio } = req.body;
        const [rowsUpdated, [updatedUser]] = await User.update(
            { firstName, lastName, email, username, bio },
            { returning: true, where: { id } }
        );
        if (rowsUpdated === 0) {
            return res.status(404).json({ message: `User with id ${id} not found` });
        }
        res.json(updatedUser);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const deleteUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const rowsDeleted = await User.destroy({ where: { id } });
        if (rowsDeleted === 0) {
            return res.status(404).json({ message: `User with id ${id} not found` });
        }
        res.json({ message: `User with id ${id} deleted successfully` });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
