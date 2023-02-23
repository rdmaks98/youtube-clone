import { createError } from "../error.js";
import Comment from "../models/Comment.js"
import Video from "../models/Video.js"
const commentController = {
    async addComment(req, res, next) {
        const addRecord = new Comment({ ...req.body,userId:req.user.id})
        try {
            const storeRecord = await addRecord.save();
            res.status(200).json(storeRecord)
         }
        catch (err) {
            next(err)
        }
    },

     async  deleteComment(req, res, next) {
         try { 
             let findCommentRecord = await Comment.findById({ videoId: req.params.id });
             if (!findCommentRecord) {
                 return next(createError(404, "comment not found"));
             }
             let videoRecord = await Video.findById(req.params.id);
             if (!videoRecord) {
                return next(createError(404, "video not found"));
             }
             if (req.user.id === findCommentRecord.userId || req.user.id === videoRecord.userId) {
                 await Comment.findByIdAndDelete(req.params.id);
                 res.status(200).json("The comment has been deleted.");
             } else {
                 return next(createError(403, "hello....,You can delete only your comment!"));
             }
        }
        catch (err) {
            next(err)
        }
     },
     
      async getComment(req, res, next) {
          try {
              let findRecords = await Comment.find({ videoId: req.params.videoId })
              res.status(200).json(findRecords)
         }
        catch (err) {
            next(err)
        }
    }
}
export default commentController;