import UserService from "../services/UserService";
import {Request, Response} from "express";
import {User} from "../entity/User";
import * as bcrypt from 'bcrypt';
import 'dotenv/config'

class AuthController {
    private readonly userService: UserService;
    constructor() {
        this.userService = new UserService();
    }

    public async register(req: Request, res: Response) {
        try {
            const {name, email, password} = req.body
            if (!name || !email || !password) {
                return res.status(400).json({
                    message: 'Please fill all fields'
                })
            }
            const user = new User();
            user.name = name;
            user.email = email;
            //hash password
            const salt = await bcrypt.genSalt(10)
            const hashPwd = await bcrypt.hash(password, salt)
            user.password = hashPwd;
            const newUser = await this.userService.createUser(user);
            res.status(201).json({
                message: 'Register success',
                data: {
                    id: newUser.id,
                    name: newUser.name,
                    email: newUser.email,
                }
            });

        } catch (err: any) {
            console.log(err)
            res.status(500).json({
                message: 'Register failed ' + err.message
            })
        }
    }

    public async login(req: Request, res: Response) {
        try {
            const {email, password} = req.body;
            if (!email || !password) {
                return res.status(400).json({
                    message: 'Please fill all fields'
                })
            }
            const user = await this.userService.findUserByEmail(email);
            if (!user) {
                return res.status(400).json({
                    message: 'Email not found'
                })
            }
            const isMatch = await bcrypt.compare(password, user.password)
            if (!isMatch) {
                return res.status(400).json({
                    message: 'Invalid password'
                })
            }
            const token = user.generateJwt()
            res.status(200).json({
                message: 'Login success',
                data: {
                    accessToken: token,
                    user: {
                        id: user.id,
                        name: user.name,
                        email: user.email,
                        createdAt: user.createdAt,
                        updatedAt: user.updatedAt,
                    }
                }
            })

        } catch (err: any) {
            res.status(500).json({
                message: 'Login failed ' + err.message
            })
        }
    }
}

export default AuthController;