import {Request, Response} from "express"
import UserService from "../services/UserService";
import {AuthenticatedRequest} from "../type";
import {User} from "../entity/User";

class UserController {
    private readonly userService: UserService;

    constructor() {
        this.userService = new UserService();
    }

    async getAllUsers(req: Request, res: Response) {
        try {
            const users = await this.userService.findAllUsers();
            return res.status(200).json({
                message: 'Get all users success',
                data: users.map((u: User) => ({
                    id: u.id,
                    name: u.name,
                    email: u.email,
                    createdAt: u.createdAt,
                    updatedAt: u.updatedAt
                }))
            });
        } catch (err: any) {
            return res.status(500).json({
                message: 'Get all users failed ' + err.message
            })
        }
    }

    async me(req: AuthenticatedRequest, res: Response) {
        try {
            const user = req.user;
            const inDbUser = await this.userService.findUserById(user.id);
            if (!inDbUser) {
                return res.status(400).json({
                    message: 'User not found'
                })
            }
            return res.status(200).json({
                message: 'Get user success',
                data: {
                    id: inDbUser.id,
                    name: inDbUser.name,
                    email: inDbUser.email,
                    createdAt: inDbUser.createdAt,
                    updatedAt: inDbUser.updatedAt
                }
            });
        } catch (err: any) {
            return res.status(500).json({
                message: 'Get user failed ' + err.message
            })
        }
    }

}

export default UserController;