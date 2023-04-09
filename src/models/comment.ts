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

    static defineAssociations(user: typeof User, post: typeof Post) {
        Comment.belongsTo(user, { foreignKey: 'userId', as: 'user' });
        Comment.belongsTo(post, { foreignKey: 'postId', as: 'post' });
    }
}

sequelize.define('Comment', {
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    userId: {
        type: DataTypes.UUIDV4,
        references: {
            model: User,
            key: 'id'
        }
    },
    postId: {
        type: DataTypes.UUIDV4,
        references: {
            model: Post,
            key: 'id'
        }
    }
}, {
    modelName: 'comment',
    tableName: 'comments',
});

Comment.defineAssociations = function (user, post) {
    Comment.belongsTo(user, { foreignKey: 'userId', as: 'user' });
    Comment.belongsTo(post, { foreignKey: 'postId', as: 'post' });
};

export default Comment;
