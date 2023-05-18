import { Request, Response } from 'express';
import Comment from '../models/comment';
import Post from '../models/post';
import User from '../user/model';
import dataSource from '../config/database';

export const getCommentsForPost = async (req: Request, res: Response) => {
    try {
        const { postId } = req.params;
        const post = await dataSource.manager.findOne(Post, { where: { id: parseInt(postId) } });
        if (!post) {
            return res.status(404).json({ message: `Post with id ${postId} not found` });
        }
        const comments = await dataSource.manager.find(Comment, { where: { post } });
        res.status(200).json(comments);
    } catch (err) {
        res.status(500).json({ message: err });
    }
};

export const createCommentForPost = async (req: Request, res: Response) => {
    try {
        const { content } = req.body;
        const postId = req.params.postId;
        const userId = req.params.userId;

        const post = await dataSource.manager.findOne(Post, { where: { id: parseInt(postId) } });
        const user = await dataSource.manager.findOne(User, { where: { id: parseInt(userId) } });
        const comment = await dataSource.manager.save(Comment, { content, post, user });
        
        res.status(200).json(comment);
    } catch (err) {
        res.status(500).json({ message: err });
    }
};

export const updateComment = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { content } = req.body;

        const comment = await dataSource.manager.update(Comment, { where: { id: parseInt(id) } }, { content });

        if (!comment.affected) {
            return res.status(404).json({ message: `Comment with id ${id} not found` });
        }
        res.json(comment);
    } catch (err) {
        res.status(500).json({ message: err });
    }
};

export const deleteComment = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const deletedComment = await dataSource.manager.delete(Comment, { where: { id: parseInt(id) } });
        if (!deletedComment.affected) {
            return res.status(404).json({ message: `Comment with id ${id} not found` });
        }
        res.json({ message: `Comment with id ${id} deleted successfully` });
    } catch (err) {
        res.status(500).json({ message: err });
    }
};
