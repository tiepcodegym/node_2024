import {Router} from "express";
import postController from "../controllers/PostController";
import authMiddleware from "../middleware/auth";
const router = Router();

router.get("/posts",[authMiddleware],postController.getAll);
router.post("/post/create",[authMiddleware],postController.create);
router.put("/post/update/:id",[authMiddleware],postController.update);
router.delete("/post/delete/:id",[authMiddleware],postController.delete);
export default router;