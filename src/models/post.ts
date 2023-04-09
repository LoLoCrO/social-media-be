import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/sequelize';
import User from './user';
import Comment from './comment';

class Post extends Model {
    public id!: number;
    public title!: string;
    public content!: string;
    public imageUrl?: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    public readonly user?: User;
    public readonly comments?: Comment[];

    static defineAssociations(user: typeof User, comment: typeof Comment) {
        Post.belongsTo(user, { foreignKey: 'postId', as: 'users' });
        Post.hasMany(comment, { foreignKey: 'postId', as: 'comments' });
    }
}

sequelize.define('Post', {
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    title: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    imageUrl: {
        type: DataTypes.STRING,
    },
    userId: {
        type: DataTypes.UUIDV4,
        references: {
            model: User,
            key: 'id'
        }
    },
    commentId: {
        type: DataTypes.UUIDV4,
        references: {
            model: Comment,
            key: 'id'
        }
    }
}, {
    modelName: 'post',
    tableName: 'posts',
});


Post.defineAssociations = function (User, Comment) {
    Post.belongsTo(User, { foreignKey: 'userId', as: 'users' });
    Post.hasMany(Comment, { foreignKey: 'postId', as: 'comments' });
};

export default Post;
