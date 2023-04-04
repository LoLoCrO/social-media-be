import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/sequelize';
import Post from './post';
import Comment from './comment';

class User extends Model {
    public id!: number;
    public username!: string;
    public email!: string;
    public password!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    public readonly posts?: Post[];
    public readonly comments?: Comment[];
}

User.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    username: {
        type: DataTypes.STRING(20),
        allowNull: false,
        unique: true,
    },
    email: {
        type: DataTypes.STRING(320),
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
}, {
    sequelize,
    tableName: 'users',
});

User.hasMany(Post, { foreignKey: 'userId', as: 'posts' });
User.hasMany(Comment, { foreignKey: 'userId', as: 'comments' });

export default User;
