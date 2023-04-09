// // models/associations.ts
// import User from './user';
// import Post from './post';
// import Comment from './comment';

// User.hasMany(Post, { foreignKey: 'userId', as: 'posts' });
// User.hasMany(Comment, { foreignKey: 'userId', as: 'comments' });

// Post.belongsTo(User, { foreignKey: 'userId', as: 'user' });
// Post.hasMany(Comment, { foreignKey: 'postId', as: 'comments' });

// Comment.belongsTo(User, { foreignKey: 'userId', as: 'user' });
// Comment.belongsTo(Post, { foreignKey: 'postId', as: 'post' });
