import User from "../models/User.js";
import Video from "../models/Video.js";
import {createError} from "../error.js"
const videoController = {
    async addVideo(req, res, next) {
        console.log(req,"woswqoi")
        try {
            const addVideo = new Video({ userId: req.user.id, ...req.body })
            await addVideo.save();
            return res.status(200).json(addVideo)
         }
        catch (err) {
          next(err);
        }
    },

    async updateVideo(req, res, next) {
        try {
            const findRecord = await Video.findById(req.params.id)
            if (!findRecord) {
                return  next(createError(404,"video can't found here"))
            }
            if (req.user.id === findRecord.userId) {
                const updateRecord = await Video.findByIdAndUpdate(req.params.id, {
                    $set: req.body
                },
                { new: true });
                res.status(200).json(updateRecord);
            }
            else {
                return next(createError(403,"you can update only your videos here...."))
            }
         }
        catch (err) {
            throw next(err);
        }
    },

    async deleteVideo(req, res, next) {
        try {
            const findRecord = await Video.findById(req.params.id)
            if (!findRecord) {
                return next(createError(404, "video can't found here"))
            }
            if (req.user.id === findRecord.userId) {
                await Video.findByIdAndDelete(req.params.id);
                res.status(200).json("video deleted"
                );
            }
            else {
                return next(createError(403, "you can deleted only your videos here...."))
            }
         }
        catch (err) {
            throw next(err);
        }
    },

    async getVideo(req, res, next) {
        try { 
            const findRecord = await Video.findById(req.params.id)
            if (!findRecord)
            {
                return next(createError(404,"video is not found from this id"))
            }
            return res.status(200).json(findRecord)
        }
        catch (err) {
            throw next(err);
        }
    },


    async addView(req, res, next) {
        try {
            await Video.findByIdAndUpdate(req.params.id, {
                $inc:{views:1}
            })
            return res.status(200).json("video view has been incresed"
            )
        }
        catch (err) {
            throw next(err);
        }
    },

    async random(req, res, next) {
        try {
            const findRecords = await Video.aggregate([{ $sample: { size : 40 } }])
            if (!findRecords) {
                return next(createError(404, "video is not found"))
            }
            return res.status(200).json(findRecords)
           
        }
        catch (err) {
            throw next(err);
        }
    },


    async trending(req, res, next) {
        try {
            const findRecords = await Video.find().sort({views:-1})
            if (!findRecords) {
                return next(createError(404, "video is not found from this id"))
            }
            return res.status(200).json(findRecords)
        }
        catch (err) {
            throw next(err);
        }
    },

    async subScriber(req, res, next) {
        try {
            const user = await User.findById(req.user.id)
            const subscribeVideo = user.subscribedUsers

            const listAll =await 
                subscribeVideo.map(async (channelId) => {
                    return await Video.find({userId:channelId})
                })
            

            return res.status(200).json(listAll.flat().sort((a,b) => b.createdAt - a.createdAt))
        }
        catch (err) {
            throw next(400,err);
        }
    },


    async findByTag(req, res, next) {
        let lowerconvert = req.query.tags.toLowerCase();
        const tags = lowerconvert?.split(",");
        try {
            const videos = await Video.find({ tags: { $in: tags } }).limit(20);
            res.status(200).json(videos);
        } catch (err) {
            next(err);
        }
    },


    async searchVideo(req, res, next) {
        const query = req.query.q;
        try {
            const videos = await Video.find({
                title: { $regex: query, $options: "i" },
            }).limit(40);
            res.status(200).json(videos);
        } catch (err) {
            next(err);
        }
    }
}
export default videoController;