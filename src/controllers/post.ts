import { Request, Response } from 'express';
import Post from '../models/post';
import User from '../models/user';

export const getPosts = async (req: Request, res: Response) => {
    try {
        const posts = await Post.findAll({ include: [User] });
        res.json(posts);
    } catch (err) {
        res.status(500).json({ message: err });
    }
};

export const getPostById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const post = await Post.findByPk(id, { include: [User] });
        if (!post) {
            return res.status(404).json({ message: `Post with id ${id} not found` });
        }
        res.json(post);
    } catch (err) {
        res.status(500).json({ message: err });
    }
};

export const createPost = async (req: Request, res: Response) => {
    try {
        const { title, content } = req.body;
        const userId = req.params.userId;
        const post = await Post.create({ title, content, userId });
        res.status(201).json(post);
    } catch (err) {
        res.status(500).json({ message: err });
    }
};

export const updatePost = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { title, content } = req.body;
        const [rowsUpdated, [updatedPost]] = await Post.update(
            { title, content },
            { returning: true, where: { id } }
        );
        if (rowsUpdated === 0) {
            return res.status(404).json({ message: `Post with id ${id} not found` });
        }
        res.json(updatedPost);
    } catch (err) {
        res.status(500).json({ message: err });
    }
};

export const deletePost = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const rowsDeleted = await Post.destroy({ where: { id } });
        if (rowsDeleted === 0) {
            return res.status(404).json({ message: `Post with id ${id} not found` });
        }
        res.json({ message: `Post with id ${id} deleted successfully` });
    } catch (err) {
        res.status(500).json({ message: err });
    }
};
