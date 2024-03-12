import {AppDataSource} from "../data-source";
import {Post} from "../entity/Post";
class PostService {
    private repository = AppDataSource.getRepository(Post)
    getAll = async (req=null,res=null) => {
        let userIdLogin = req.user.id;
       return await this.repository.find({
           where: {
               user_id: userIdLogin
           },
       })
    }
    create = async (data) => {
        return await this.repository.save(data)
    }
    findById = async (id) => {
        return await this.repository.find({where: {id: id}})
    }
    update = async (id,data) => {
        return await this.repository.update(id,data)
    }
    delete = async (id) => {
        await this.repository.delete(id)
    }
}
export default PostService;