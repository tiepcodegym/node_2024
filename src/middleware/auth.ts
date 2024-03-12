import {NextFunction, Response} from "express";
import * as jwt from "jsonwebtoken";
import 'dotenv/config';
import {AuthenticatedRequest} from "../type";


const authMiddleware = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
        if (!req.headers.authorization) {
            return res.status(401).json({
                message: 'Auth failed: please provide token'
            });
        }
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err: any) {
        return res.status(401).json({
            message: 'Auth failed: invalid token'
        });
    }
}

export default authMiddleware;