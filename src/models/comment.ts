import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/sequelize';
import User from './user';
import Post from './post';

class Comment extends Model {
    public id!: number;
    public content!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    public readonly user?: User;
    public readonly post?: Post;
}

Comment.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
}, {
    sequelize,
    tableName: 'comments',
});

Comment.belongsTo(User, { foreignKey: 'userId', as: 'user' });
Comment.belongsTo(Post, { foreignKey: 'postId', as: 'post' });

export default Comment;
