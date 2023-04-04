import { Request, Response } from 'express';
import Comment from '../models/comment';
import Post from '../models/post';
import User from '../models/user';

export const getCommentsForPost = async (req: Request, res: Response) => {
    try {
        const { postId } = req.params;
        const post = await Post.findByPk(postId);
        if (!post) {
            return res.status(404).json({ message: `Post with id ${postId} not found` });
        }
        const comments = await Comment.findAll({ where: { postId }, include: [User] });
        res.json(comments);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const createCommentForPost = async (req: Request, res: Response) => {
    try {
        const { content } = req.body;
        const postId = req.params.postId;
        const userId = req.params.userId;
        const comment = await Comment.create({ content, postId, userId });
        res.status(201).json(comment);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const updateComment = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { content } = req.body;
        const [rowsUpdated, [updatedComment]] = await Comment.update(
            { content },
            { returning: true, where: { id } }
        );
        if (rowsUpdated === 0) {
            return res.status(404).json({ message: `Comment with id ${id} not found` });
        }
        res.json(updatedComment);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const deleteComment = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const rowsDeleted = await Comment.destroy({ where: { id } });
        if (rowsDeleted === 0) {
            return res.status(404).json({ message: `Comment with id ${id} not found` });
        }
        res.json({ message: `Comment with id ${id} deleted successfully` });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
