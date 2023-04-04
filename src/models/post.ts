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
}

Post.init({
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
}, {
    sequelize,
    tableName: 'posts',
});

Post.belongsTo(User, { foreignKey: 'userId', as: 'user' });
Post.hasMany(Comment, { foreignKey: 'postId', as: 'comments' });

export default Post;
