import { Request, Response } from 'express';
import Post from '../models/post';
import User from '../models/user';
import dataSource from '../config/database';


export const getPosts = async (req: Request, res: Response) => {
    try {
        const posts = await dataSource.manager.find(Post);
        res.json(posts);
    } catch (err) {
        res.status(500).json({ message: err });
    }
};

export const getPostById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const post = await dataSource.manager.findOne(Post, { where: { id: parseInt(id) } });
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
        const user = await dataSource.manager.findOne(User, { where: { id: parseInt(userId) } });
        const post = await dataSource.manager.save(Post, { title, content, user });
        res.status(201).json(post);
    } catch (err) {
        res.status(500).json({ message: err });
    }
};

export const updatePost = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { title, content } = req.body;
        const post = await dataSource.manager.update(Post, { where: { id: parseInt(id) } }, { title, content });

        if (!post.affected) {
            return res.status(404).json({ message: `Post with id ${id} not found` });
        }
        res.json(post);
    } catch (err) {
        res.status(500).json({ message: err });
    }
};

export const deletePost = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const post = await dataSource.manager.delete(Post, { where: { id } });
        if (!post.affected) {
            return res.status(404).json({ message: `Post with id ${id} not found` });
        }
        res.json({ message: `Post with id ${id} deleted successfully` });
    } catch (err) {
        res.status(500).json({ message: err });
    }
};
