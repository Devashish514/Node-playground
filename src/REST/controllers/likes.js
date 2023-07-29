const user = require("../models/user");
const blogs = require("../models/blogs");
const CustomError = require("../utils/errorHandling");
const Likes = require("../utils/utilClass");


/**
 * This Like Blog API , would work similar to what we see in Facebook and Instagram Likes , So when user first hit the like button , it add it to the User Likes , but again hit will remove the Like.
 * 
 * For this, Implementation , I leveraged the Singly Linked List Approach...
 * 
 * Insertion and Deletion in Linked List is O(1)
 */

const likeBlog = async (req, res) => {
    try {
        let { userId, blogId } = req.params;

        // empty Linked List => LikeNode{ element: head, next: null };
        let newLikeList = new Likes();
        console.log(newLikeList);

        const userLikeList = await user.findById(userId);
        console.log(userLikeList);
        if (userLikeList.length === 0) {

            newLikeList.insertLikes(blogId);
            const findUser = await user.findByIdAndUpdate(userId, { likes: newLikeList.createList() }, { new: true });
            const updateLikeCount = await blogs.findByIdAndUpdate(blogId, { $inc: { likesCount: 1 } }, { new: true });
            return res.status(200).send({ blogData: updateLikeCount, userData: findUser });
        }
        else {

            for (let i = 0; i < userLikeList.length; i++) {
                newLikeList.insertLikes(userLikeList[i]);   // LikeNode{ element: head, next: LikeNode{ element: blog1, next: [LikeNode] } };
            };

            // if blogId already present in List, remove it, else insert it.
            if (newLikeList.findLikes(blogId).status) {
                newLikeList.removeLike(blogId);
            } else {
                newLikeList.insertLikes(blogId);
            }

            const findUser = await user.findByIdAndUpdate(userId, { likes: newLikeList.createList() }, { new: true });
            const updateLikeCount = await blogs.findByIdAndUpdate(blogId, { $inc: { likesCount: 1 } }, { new: true });

            return res.status(200).send({ blogData: updateLikeCount, userData: findUser });
        }

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