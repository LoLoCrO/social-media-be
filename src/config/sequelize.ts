import { Sequelize } from 'sequelize';

import User from '../models/user';
import Post from '../models/post';
import Comment from '../models/comment';

require('dotenv').config();

const sequelize: Sequelize = new Sequelize(
    process.env.DB_NAME || '',
    process.env.DB_USER || '',
    process.env.DB_PASSWORD || '',
    {
        host: process.env.DB_HOST || 'localhost',
        port: parseInt(process.env.DB_PORT || '3306'),
        dialect: 'mysql',
    },
);

try {
    sequelize.authenticate()
        .then(() => {
            console.log('Database connection established successfully.')
        
            User.defineAssociations(Post, Comment);
            Post.defineAssociations(User, Comment);
            Comment.defineAssociations(User, Post);
        })
        .catch((err) => {
            throw new Error(err)
        });
} catch (error) {
    console.error('Unable to connect to the database:', error);
}

export default sequelize;
