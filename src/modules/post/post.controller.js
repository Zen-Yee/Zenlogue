import * as postService from "./post.service.js";

export const allPost = async (req, res, next) => {
  const limit = Math.min(parseInt(req.query.limit, 10) || 10, 100);
  const offset = Math.max(parseInt(req.query.offset, 10) || 0, 0);

  try {
    const posts = await postService.getPosts(limit, offset);
    res.status(200).json({
      success: true,
      data: posts,
    });
  } catch (err) {
    next(err);
  }
};

export const onePost = async (req, res, next) => {
  try {
    const postId = req.params.id;
    const posts = await postService.getPostById(postId);

    // If it return an empty array when SELECT with the post_id, throw error:
    if (!posts) {
      const err = new Error("Post not found");
      err.status = 404;
      return next(err);
    }

    res.status(200).json({
      success: true,
      postData: posts
    });

  } catch (err) {
    next(err);
  }
};

export const createPost = async (req, res, next) => {
  try {
    const { title, content } = req.body;
    const newPost = await postService.createPost(title, content, req.user.userId);

    res.status(200).json({
      success: true,
      postData: newPost,

    });

  } catch (err) {
    next(err);
  }
};

export const updatePost = async (req, res, next) => {
  try {
    const postId = req.params.id;
    const { title, content } = req.body;
    const updatedPost = await postService.updatePost(postId, title, content, req.user.userId);

    // If it return an empty array when SELECT with the post_id, throw error:
    if (!updatedPost) {
      const err = new Error("Post not found");
      err.status = 404;
      return next(err);
    }


    res.status(200).json({
      success: true,
      postData: updatedPost
    });

  } catch (err) {
    next(err);
  }
};

export const deletePost = async (req, res, next) => {
  try {
    const postId = req.params.id;
    const deleted = await postService.deletePost(postId, req.user.userId);

    // If it return an empty array when SELECT with the post_id, throw error:
    if (!deleted) {
      const err = new Error("Post not found");
      err.status = 404;
      return next(err);
    }

    res.status(200).json({
      success: true,
      message: "Post deleted"
    });

  } catch (err) {
    next(err);
  }
};
