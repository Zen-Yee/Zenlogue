import express from "express";
import * as commentController from "./comment.controller.js";
import { authMiddleware } from "../../middleware/auth.middleware.js";

const router = express.Router();

router.get("/:post_id", commentController.displayComments);
// router.post("/create", authMiddleware, commentController.addComment);
// router.patch("/:id", authMiddleware, commentController.updateComment);
// router.delete("/:id", authMiddleware, commentController.deleteComment);

export default router;
