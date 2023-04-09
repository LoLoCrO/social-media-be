// // models/index.ts
// import { Sequelize } from 'sequelize';
// import User from './user';
// import Post from './post';
// import Comment from './comment';

// const sequelize = new Sequelize(
//     process.env.DB_NAME || '',
//     process.env.DB_USER || '',
//     process.env.DB_PASSWORD || '',
//     {
//         host: process.env.DB_HOST || 'localhost',
//         port: parseInt(process.env.DB_PORT || '3306'),
//         dialect: 'mysql',
//     },
// );

// User.defineAssociations(Post, Comment);
// Post.defineAssociations(User, Comment);
// Comment.defineAssociations(User, Post);

// sequelize.authenticate()
//     .then(() => console.log('Database connection established successfully.'))
//     .catch((err) => console.error('Unable to connect to the database:', err));

// export { User as User, Post as Post, Comment as Comment, sequelize };
