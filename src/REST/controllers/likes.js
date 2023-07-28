const user = require("../models/user");
const blogs = require("../models/blogs");
const CustomError = require("../utils/errorHandling");


const likeBlog = async (req, res) => {
    try {
        let { userId, blogId } = req.params;
        const findUser = await user.findByIdAndUpdate(userId, { $push: { likes: blogId } }, { new: true });
        const updateLikeCount = await blogs.findByIdAndUpdate(blogId, { $inc: { likesCount: 1 } }, { new: true });
        return res.status(200).send({ blogData: updateLikeCount, userData: findUser });

    } catch (err) {
        if (err instanceof CustomError) {
            return res.status(err.statusCode).send({ msg: err.message });
        }
        return res.status(500).send({ msg: err.message });
    }
}



module.exports = {
    likeBlog
}