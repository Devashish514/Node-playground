const blogs = require("../models/blogs");
const author = require("../models/author");
const CustomError = require("../utils/errorHandling");
const { isEmptyObject } = require("../utils/helperFunctions");
const { blogsInputValidation } = require("../validations/blogs.validation");

const createBlog = async (req, res) => {
    try {
        let data = req.body;

        const { error } = blogsInputValidation(data);
        if (error) throw new CustomError(400, error.details[0].message);

        const findAuthor = await author.findById(data.author);

        if (isEmptyObject(findAuthor)) {
            throw new CustomError(404, "No Author Found");
        } else {
            const blog = await blogs.create(data);
            findAuthor.blogs.push(blog);
            await findAuthor.save();
            return res.status(201).send({ data: blog });
        }

    } catch (err) {
        if (err instanceof CustomError) {
            return res.status(err.statusCode).send({ msg: err.message });
        }
        console.error(err.message);
        return res.status(500).send({ msg: err.message });
    }
}

module.exports = {
    createBlog
}