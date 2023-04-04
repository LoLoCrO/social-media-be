import { Sequelize } from 'sequelize';

const sequelize = new Sequelize(
    process.env.DB_NAME || '',
    process.env.DB_USER || '',
    process.env.DB_PASSWORD || '',
    {
        host: process.env.DB_HOST || 'localhost',
        port: parseInt(process.env.DB_PORT || '3306'),
        dialect: 'mysql',
    },
);

sequelize.authenticate()
    .then(() => console.log('Database connection established successfully.'))
    .catch((err) => console.error('Unable to connect to the database:', err));

export default sequelize;
