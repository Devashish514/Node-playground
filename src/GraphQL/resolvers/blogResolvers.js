const blogs = require("../../REST/models/blogs");
const CustomError = require("../../REST/utils/errorHandling");

const getAllBlogsResolver = async () => {
    try {
        const allBlogs = await blogs.find({ isDeleted: false }).populate('author');
        return allBlogs;
    } catch (err) {
        throw new CustomError(400, err.message);
    }
}

const getBlogByIdResolver = async (args) => {
    try {
        console.log(`getBlogById args: `, args);
        let { id } = args;
        const blog = await blogs.findById(id).populate('author');
        return blog;
    } catch (err) {
        throw new CustomError(400, err.message);
    }
}

module.exports = {
    getAllBlogsResolver,
    getBlogByIdResolver
}