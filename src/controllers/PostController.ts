import PostService from "../services/PostService";

class PostController {
    private readonly postService: PostService;
    constructor() {
        this.postService = new PostService();
    }
    getAll = async (req,res)=>{
        let listPost = await this.postService.getAll(req,res)
        return res.json(listPost);
    }
    create = async (req, res) => {
        let data = {
            title:req.body.title,
            content:req.body.content,
            user_id:req.user.id
        };
        await this.postService.create(data)
        return res.json(data);
    }
    update = async (req,res)=>{
        let post =await this.postService.findById(req.params.id);
        let user_id = post[0].user_id;
        if(user_id !== req.user.id){
            return res.send("Ban khong co quyen sua")
        }
        try {
            await this.postService.update(req.params.id, {
                title: req.body.title,
                content: req.body.content,
            });
            return res.status(200).json({
                message: 'update success'
            });
        } catch (error) {
            console.error("Lỗi khi cập nhật bài viết:", error);
            return res.status(500).send("Đã xảy ra lỗi khi cập nhật bài viết");
        }
    }
    delete = async (req,res)=>{
        let post =await this.postService.findById(req.params.id);
        let user_id = post[0].user_id;
        if(user_id !== req.user.id){
            return res.send("Ban khong co quyen xoa")
        }
        await this.postService.delete(req.params.id)
        return res.status(200).json({
            message: 'Delete success'
        });
    }
}
export default new PostController();