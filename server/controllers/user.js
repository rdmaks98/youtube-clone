import User from "../models/User.js";
import { createError } from "../error.js";
import Video from "../models/Video.js";
const userController = {
  async updateUser(req, res,next){
    if (req.params.id === req.user.id) {
      try {
        const updateRecord = await User.findByIdAndUpdate(req.params.id,
          {
            $set:req.body
          },
          {
            new: true
          })
          .select("-password")
        res.status(200).json(updateRecord)
      }
      catch (err) {
        next(err)
      }
    } else {
      return next(createError(403,"you can update only your account"))
    }                                                                                            
  },

  async deleteUser(req, res,next) {
    if (req.params.id === req.user.id) {
      try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json({status:true,message:"User has been deleted."});
      } catch (err) {
        return next(err);
      }
    } else {
      return next(createError(403, "You can delete only your account!"));
    }
  },

  async getUSer(req, res) {
    try {
      const user = await User.findById(req.params.id)
      if (!user) {
        return createError(404,"User Is Not Found")
      }
      return res.status(200).json(user)
     }
    catch (err) {
      next (err)
    }
  },

  async subscribeUser(req, res,next) {
    try {
      await User.findByIdAndUpdate(req.user.id, {
        $push: { subscribedUsers:req.params.id}
      })
      await User.findByIdAndUpdate(req.params.id, {
        $inc: { subscribers:1}
      })
      return res.status(200).json({
        message:"Subscription successfully"
      })
     }
    catch (err) {
      next(err)
    }
  },

  async unSubscribeUser(req, res,next) {
    try {
      await User.findByIdAndUpdate(req.user.id, {
        $pull: { subscribedUsers: req.params.id }
      })
      await User.findByIdAndUpdate(req.params.id, {
        $inc: { subscribers: -1 }
      })
      return res.status(200).json({
        status: true,
        message: "unSubscription successfully"
      })
     }
    catch (err) {
      next(err)
    }
  },

  async likeVideo(req, res,next) {
    const id = req.user.id;
    const videoId = req.params.videoId;

    try {
      await Video.findByIdAndUpdate(videoId, {
        // only one time add like not
        $addToSet: { likes: id },
        $pull:{dislikes:id}
      })
      res.status(200).json({message:"the video hase been likes addedd successfully"})
     }
    catch (err) {
      next(err)
    }
  },

  async dislikeVideo(req, res,next) {
    const id = req.user.id;
    const videoId = req.params.videoId;

    try {
      await Video.findByIdAndUpdate(videoId, {
        // only one time add like not
        $addToSet: { dislikes: id },
        $pull: { likes: id }
      })
      res.status(200).json({ message: "the video hase been dislike" })
    }
    catch (err) {
      next(err)
    }
  }
}
export default userController;