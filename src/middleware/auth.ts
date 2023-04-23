import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

const authenticate = (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).send({ message: 'Authorization required.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!);
        // TODO: Fix this
        // @ts-ignore
        req.body.userId = decoded.id;
        next();
    } catch (error) {
        console.error(error);
        res.status(401).send({ message: 'Invalid token.' });
    }
};

export default authenticate;
