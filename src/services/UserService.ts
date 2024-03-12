import {Repository} from "typeorm";
import {User} from "../entity/User";
import {AppDataSource} from "../data-source";

class UserService {
    private readonly userRepository: Repository<User>;

    constructor() {
        this.userRepository = AppDataSource.getRepository(User);
    }

    async createUser(user: User): Promise<User> {
        const existUser = await this.userRepository.findOne({
            where: {
                email: user.email
            }
        })
        if (existUser) throw new Error('User already exist')
        return await this.userRepository.save(user)
    }

    async findUserById(id: number): Promise<User> {
        return await this.userRepository.findOne({
            where: {
                id
            }
        })
    }

    async findUserByEmail(email: string): Promise<User> {
        return await this.userRepository.findOne({
            where: {
                email
            }
        })
    }

    async findAllUsers(): Promise<User[]> {
        return await this.userRepository.find();
    }


}

export default UserService;