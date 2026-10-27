import * as commentService from "./comment.service.js";

export const displayComments = async (req, res, next) => {
    try {
        const { post_id } = req.params;
        const { cursor, limit } = req.query;

        const comments = await commentService.getCommentsByPost(
            post_id, 
            cursor,
            limit ? Number(limit) : undefined
        );

        res.status(200).json({
            success: true,
            commentsData: comments,
              nextCursor: comments.length > 0 ? comments[comments.length - 1].created_at : null
        });

    } catch (err) {
        next(err);
    }
};
